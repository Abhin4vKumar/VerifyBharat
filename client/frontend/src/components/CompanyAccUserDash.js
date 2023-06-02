import React, { useContext, useEffect } from 'react'
import { useState, useRef } from 'react';
import CompanyAccUserTable from './CompanyAccUserTable';
import HackContext from '../Context/HackContext';
import DashBoardNav from './DashBoardNav';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganisationDetails } from '../actions/organisationAction';

const GetIpfsUrlFromPinata = (pinataUrl) => {
    var IPFSUrl = pinataUrl.split("/");
    const lastIndex = IPFSUrl.length;
    IPFSUrl = "https://ipfs.io/ipfs/"+IPFSUrl[lastIndex-1];
    return IPFSUrl;
  };
const CompanyAccUserDash = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const context = useContext(HackContext);
    const {provider , account , contract } = context;
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (file) { 
        try {
  
          const signer = provider.getSigner();
          const address = await signer.getAddress();
      
  
          //storing file
          const formData = new FormData();
          formData.append("file", file);
  
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `b4c665100289df63f611`,
              pinata_secret_api_key: `9a443b79553ebe1f2827fec6bc78a910fca49383a394870947cf8253c4afa1e7`,
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
                  pinata_api_key: `b4c665100289df63f611`,
                  pinata_secret_api_key: `9a443b79553ebe1f2827fec6bc78a910fca49383a394870947cf8253c4afa1e7`,
              }
          })
          const metaHash = `https://gateway.pinata.cloud/ipfs/${metadata.data.IpfsHash}`;
  
  
  
          // adding certificate 
          var addCertificate = await contract.additem(metaHash,"0x14dC79964da2C08b23698B3D3cc7Ca32193d9955","0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",address);
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
    const {loading , isAuthenticatedUser , user} = useSelector((state)=>state.user);
    const dispatch = useDispatch();
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
                    <input type="text" />
                </div>
                <div className="btnAddUserPopupDiv">
                    <button>Add</button>
                </div>
            </div>

            <div ref={viewCertRef} className="addUserPopupWindow">
                <label htmlFor="">Certificate ID</label>
                <div className="inputAddUserPopupDiv">
                    <input type="text" />
                </div>
                <div className="btnAddUserPopupDiv">
                    <button onClick={handleOnViewClick} >View</button>
                </div>
                <div className="certificatePdfView">

                </div>
            </div>



            <div className="topNavCompanyItems">
                <div className="accountListSearchCompanyDiv">
                    <input type="text" className="companyAccSearchList" /> <button className="accountListSearchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div onClick={handleOnPopupClick} className="accAddUser"><button className='accAddUserBtn'>Issue Certificate</button></div>
                <div className="viewCertUser accAddUser"><button onClick={handleOnViewCert} className="viewCertUserBtn">View Certificate</button></div>


            </div>

            {orgResult.certificatesIssued?orgResult.certificatesIssued.map((i , index) => {
                return <CompanyAccUserTable user={user} i={i} sno={index} name={i.user_name} dateJoin={i.date} certificateGiven={i.name} accountNo={i.cert_id} />
            }):<></>}
        </div>
    )
}
export default CompanyAccUserDash;