import React, { useState } from "react";
import { useRef } from "react";
import "./Style/UserDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { revokeAccess, shareAccess } from "../actions/certificateAction";

const folderList = ["folder1", "folder2", "folder3", "folder4", "folder5"];

const UserDashLIst = (props) => {
  const popUpAddAccess = useRef()
  const popUpAddAccessBg = useRef()

  const handleOnAccessPopUpRemove = ()=>{
    popUpAddAccess.current.style.display = "none"
    popUpAddAccessBg.current.style.display = "none"
  }
  const handleOnAccessPopUpShow = ()=>{
    popUpAddAccess.current.style.display = "flex"
    popUpAddAccessBg.current.style.display = "block"
    console.log("clikced")
  }

  const dispatch = useDispatch();
  const menuVisible = useRef();
  const addAccessPopup = useRef();
  const addAccessListPopup = useRef();
  const handleOnMenuHover = () => {
    // menuVisible.current.style.display  = "none"
    menuVisible.current.style.opacity = "1";
    menuVisible.current.style.transform = "translate(-82px, 0px)";
    // menuVisible.current.style.display  = "none"
  };
  const handleOnMenuOut = () => {
    menuVisible.current.style.opacity = "0";
    menuVisible.current.style.transform = "translate(-82px, -25px)";
  };
  const [orgId, setOrgId] = useState();

  const addAccess =() => {
    
    
  }
  const removeAccess = (e) => {
    dispatch(revokeAccess(props.i._id, e.target.key));
    closeAccessPopup();
  };
  const handleOrgId = (e) => {
    setOrgId(e.target.value);
  };
  const openPopup = () => {
    handleOnAccessPopUpShow()
    // addAccessPopup.current.style.opacity = "1";
    // addAccessPopup.current.style.display = "flex";
  };
  const closePopup = () => {
    addAccessPopup.current.style.opacity = "0";
    addAccessPopup.current.style.display = "none";
  };
  const openAccessPopup = () => {
    // addAccessListPopup.current.style.opacity = "1";
    // addAccessListPopup.current.style.display = "flex";
  };
  const closeAccessPopup = () => {
    addAccessListPopup.current.style.opacity = "0";
    addAccessListPopup.current.style.display = "none";
  };
  const handleView = () => {
    //View Certificate
  };
  const handleGetId = () => {
    navigator.clipboard.writeText(props.i.cert_id);
  };
  const popupCSS = {
    display: "none",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    top: "0",
    left: "0",
    zIndex: "5",
  };
  const popUpWhitePart = {
    display: "Flex",
    backgroundColor: "white",
    minWidth: "200px",
    minHeight: "200px",
  };
  return (
    <div className="certCardDiv">
      <div className="certCard">
        {/* <input type="checkbox" style={{ cursor: "pointer" }} /> */}
        {/* <div className="leftPreviewCert">
          <button className="leftPreviewCertBtn">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div> */}
        <div className="sno">{props.sno}</div>
        <div className="certiLeft">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/94/Certificate_%2889083%29_-_The_Noun_Project.svg"
            alt=""
          />
        </div>
        <div className="certiNameSide">{props.certName}</div>
        <div className="certiNameSide">{props.givenBy}</div>
        <div className="certiNameSide">{props.date}</div>
        <div  onClick={openPopup} className="menuBtn">
          <i class="fa-solid fa-plus" style={{ color: "#1d5dd6" }}></i>
        </div>

        <div style={popupCSS} ref={addAccessPopup} className="Popup">
          <div style={popUpWhitePart}>
            <a className="closeDivPopup" onClick={closePopup}>
              X
            </a>
            <div className="inputAdd">
              <input type="text" onChange={handleOrgId}></input>
              <button ref={addAccess} >Add Access</button>
            </div>
          </div>
        </div>

        {/* <div style={popupCSS} ref={addAccessListPopup} className="Popup">
          <div style={popUpWhitePart}>
            <a onClick={closeAccessPopup}>X</a>
            <ul>
              {props.i.accessTo.map((element, index) => {
                <li>
                  {element.organisation.name}
                  <a
                    key={element.organisation.org_id}
                    acc_no={element.organisation.acc_no}
                    onClick={removeAccess}
                  >
                    Revoke Access
                  </a>
                </li>;
              })}
            </ul>
          </div>
        </div> */}

        <div onClick={handleOnAccessPopUpRemove} ref={popUpAddAccessBg} className="popBack"></div>

        <div ref = {popUpAddAccess} className="popUpWindowDash">
          <div className="inpWindowPopUpDiv">
            <input className="inpWindowPopUp" type="text" />
          </div>
          <div className="popUpBtnAddAccess">
            <button className="button-4">Add Access</button>
          </div>
        </div>

        <div
          onMouseOver={handleOnMenuHover}
          onMouseOut={handleOnMenuOut}
          className="menuBtn"
        >
          <i class="fa-solid fa-ellipsis" style={{ color: "#1d5dd6" }}></i>
          <div className="certiMenu">
            <ul ref={menuVisible}>
              <a onClick={openAccessPopup}>
                <li onClick={handleOnAccessPopUpShow}>Access List</li>
              </a>
              <a onClick={handleView}>
                <li>View</li>
              </a>
              <a onClick={handleGetId}>
                <li>Get ID</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashLIst;
