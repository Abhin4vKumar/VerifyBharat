import React, { useContext, useEffect } from 'react'
import { useState, useRef } from 'react';
import CompanyAccUserTable from './CompanyAccUserTable';
import axios from 'axios';
import HackContext from '../Context/HackContext';
import DashBoardNav from './DashBoardNav';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganisationDetails } from '../actions/organisationAction';
import { useNavigate } from 'react-router-dom';
import { createCertificate } from '../actions/certificateAction';

const GetIpfsUrlFromPinata = (pinataUrl) => {
    var IPFSUrl = pinataUrl.split("/");
    const lastIndex = IPFSUrl.length;
    IPFSUrl = "https://ipfs.io/ipfs/"+IPFSUrl[lastIndex-1];
    return IPFSUrl;
  };
const CompanyAccUserDash = () => {
    const  navigate = useNavigate();
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    // org Id
    const {loading , isAuthenticated , user} = useSelector((state)=>state.user);
    if(!loading && !isAuthenticated){
        navigate("/login");
    }else if(isAuthenticated){
        if(!user.employee){
            console.log("asdadasdsd");
            navigate("/dashboard");
        }
        console.log("uSer is Employee");
    }
    
    const [receiver , setReceiver] = useState();

    const changeReceiverAddress=(e)=>{
        setReceiver(e.target.value);
    }
    // user ID
    const context = useContext(HackContext);
    const {provider , account , contract } = context;
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(provider , account , contract);
      if (file) { 
        try {
  
          const signer = provider.getSigner();
          const address = await signer.getAddress();
      
  
          //storing file
          const formData = new FormData();
          formData.append("file", file);
          console.log(formData);
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `94b4247195d5c299bf14`,
              pinata_secret_api_key: `4f8d9fafbb7d8257808996ebf217a29519c79889278a83d99110f9f7a52fc596`,
              "Content-Type": "multipart/form-data",
            },
          });
  
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          console.log(ImgHash);
  
  
          //storing json
          const nftJSON = {
              name:fileName,image:ImgHash
          }
  
          const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
          const metadata = await axios 
          .post(url, nftJSON, {
              headers: {
                  pinata_api_key: `94b4247195d5c299bf14`,
                  pinata_secret_api_key: `4f8d9fafbb7d8257808996ebf217a29519c79889278a83d99110f9f7a52fc596`,
              }
          })
          const metaHash = `https://gateway.pinata.cloud/ipfs/${metadata.data.IpfsHash}`;
  
  
  
          // adding certificate 
          console.log("receiver : ",receiver);
          console.log("user.workOrganisationAccNo : ",user.workOrganisationAccNo);
          var addCertificate = await contract.additem(metaHash,receiver,user.workOrganisationAccNo,address);
          // const id = await contract.tokens().toNumber;
          // console.log(id);
          await addCertificate.wait();
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const tx= await signer.sendTransaction({
      //   to: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      //   value: ethers.utils.parseEther("3")
      // });
      alert("Successfully Image Uploaded");
      const data = new FormData();
      const id = 0;
      data.set("name",fileName);
      data.set("cert_id",id);
      data.set("userId",receiver);
      dispatch(createCertificate())
      setFileName("No image selected");
      setFile(null);
    } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    };}
    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
        
      };
    const bgRef = useRef()
    const addUserRef = useRef()
    const viewCertRef = useRef()
    useEffect(()=>{
        dispatch(getOrganisationDetails(user.workOrganisation));
    },[dispatch , getOrganisationDetails
        , user.workOrganisation])
    
    const orgResult = useSelector((state)=>state.organisationDetails);
    const [pdfFile, setPdfFile] = useState()

    const handleOnBackClick = () => {
        bgRef.current.style.display = "none"
        addUserRef.current.style.display = "none"
        viewCertRef.current.style.display = "none"

    }

    const handleOnViewCert = () => {
        bgRef.current.style.display = "block"
        viewCertRef.current.style.display = "flex"
    }
    const handleOnPopupClick = () => {
        bgRef.current.style.display = "block"
        addUserRef.current.style.display = "flex"

    }
    const handleOnViewClick = () => {
        fetch("https://www.copyright.gov/docs/certificate_sample.pdf")
            .then((response) => response.blob())
            .then((blob) => {
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                    console.log(e.target.result);
                };
            })
            .catch((error) => {
                console.error("Error fetching PDF:", error);
            });


    }



    return (
        <div>
            <DashBoardNav />
            <div ref={bgRef} onClick={handleOnBackClick} className="companyBackArea"></div>
            <div ref={addUserRef} className="addUserPopupWindow">
                <div className="inputAddUserPopupDiv">
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="file-upload" className="choose">
                        Choose Image
                        </label>
                        <input
                        className='inpFile'
                        disabled={!account}
                        type="file"
                        id="file-upload"
                        name="data"
                        onChange={retrieveFile}
                        />
                        <input type="text" value={receiver}onChange={changeReceiverAddress} placeholder='Enter User Address' />
                        <span className="textArea">Image: {fileName}</span>
                        <button type="submit" className="upload" disabled={!file}>
                        Upload File
                        </button>
                    </form>
                </div>
            </div>

            <div ref={viewCertRef} className="addUserPopupWindow">
                <label htmlFor="">Certificate ID</label>
                <div className="inputAddUserPopupDiv">
                    <input className='inpAfterPopup' type="text" />
                </div>
                <div className="btnAddUserPopupDiv">
                    <button className='button-4' onClick={handleOnViewClick} >View</button>
                </div>
                <div className="certificatePdfView">

                </div>
            </div>



            <div className="topNavCompanyItems">
                {/* <div className="accountListSearchCompanyDiv">
                    <input type="text" className="companyAccSearchList" /> <button className="accountListSearchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div> */}
                <div onClick={handleOnPopupClick} className="accAddUser"><button className='accAddUserBtn button-4' role = "button">Issue Certificate</button></div>
                <div className="viewCertUser accAddUser"><button onClick={handleOnViewCert} className="viewCertUserBtn button-4">View Certificate</button></div>


            </div>

            {orgResult.certificatesIssued?orgResult.certificatesIssued.map((i , index) => {
                return <CompanyAccUserTable user={user} i={i} sno={index} name={i.user_name} dateJoin={i.date} certificateGiven={i.name} accountNo={i.cert_id} />
            }):<></>}
        </div>
    )
}
export default CompanyAccUserDash;