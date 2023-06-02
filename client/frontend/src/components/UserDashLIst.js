import React, { useState } from 'react'
import { useRef } from 'react'
import "./Style/UserDashboard.css"
import { useDispatch, useSelector } from 'react-redux'
import { revokeAccess, shareAccess } from '../actions/certificateAction'

const folderList = [
    "folder1",
    "folder2",
    "folder3",
    "folder4",
    "folder5"
]

const UserDashLIst = (props) => {
    const dispatch = useDispatch();
    const menuVisible = useRef();
    const addAccessPopup = useRef();
    const addAccessListPopup = useRef();
    const handleOnMenuHover = ()=>{
        // menuVisible.current.style.display  = "none"
        menuVisible.current.style.opacity  = "1"
        menuVisible.current.style.transform  = "translate(-82px, 0px)"
        // menuVisible.current.style.display  = "none"
    }
    const handleOnMenuOut = ()=>{

        menuVisible.current.style.opacity  = "0"
        menuVisible.current.style.transform  = "translate(-82px, -25px)"

    }
    const [orgId , setOrgId] = useState();
    const addAccess = ()=>{
        // id-> input from user , org Id
        dispatch(shareAccess(props.i._id , orgId));
        closePopup();
    }
    const removeAccess = (e)=>{
        dispatch(revokeAccess(props.i._id , e.target.key));
        closeAccessPopup();
    }
    const handleOrgId = (e)=>{
        setOrgId(e.target.value);
    }
    const openPopup = ()=>{
        addAccessPopup.current.style.opacity = "1";
    }
    const closePopup = ()=>{
        addAccessPopup.current.style.opacity  = "0";
    }
    const openAccessPopup = ()=>{
        addAccessListPopup.current.style.opacity = "1";
    }
    const closeAccessPopup = ()=>{
        addAccessListPopup.current.style.opacity = "0";
    }
    const handleView = ()=>{
        //View Certificate
    }
    const handleGetId = ()=>{
        navigator.clipboard.writeText(props.i.cert_id);
    }
  return (
    <div className='certCardDiv' >
        <div className="certCard">
            <input type="checkbox" style={{cursor:"pointer"}}/>
            <div className="leftPreviewCert">< button className='leftPreviewCertBtn' ><i class="fa-solid fa-eye"></i></button></div>
            <div className="sno">{props.sno}</div>
            <div className="certiLeft"><img src= "https://upload.wikimedia.org/wikipedia/commons/9/94/Certificate_%2889083%29_-_The_Noun_Project.svg" alt="" /></div>
            <div className="certiNameSide">{props.certName}</div>
            <div className="certiNameSide">{props.givenBy}</div>
            <div className="certiNameSide">{props.date}</div>
            <div onClick={openPopup} className="menuBtn"><i class="fa-solid fa-plus" style={{color:"#1d5dd6"}}></i></div>
            <div ref={addAccessPopup} className='Popup'><a onClick={closePopup}>X</a><div><input type='text' onChange={handleOrgId}></input><a onClick={addAccess}>Add Access</a></div></div>
            <div ref={addAccessListPopup} className='Popup'><a onClick={closeAccessPopup}>X</a><div><ul>
                {props.i.accessTo.map((element,index)=>{
                    <li>{element.organisation.name}<a key={element.organisation.org_id} acc_no={element.organisation.acc_no} onClick={removeAccess}>Revoke Access</a></li>
                })}
                </ul></div></div>
            <div onMouseOver={handleOnMenuHover} onMouseOut={handleOnMenuOut} className="menuBtn"><i class="fa-solid fa-ellipsis" style={{color:"#1d5dd6"}}></i>
                <div className="certiMenu"><ul ref={menuVisible}>
                    <a onClick={openAccessPopup}><li>Access List</li></a>
                    <a onClick={handleView}><li>View</li></a>
                    <a onClick={handleGetId}><li>Get ID</li></a>
                </ul></div>
            </div>
            

        </div>
    </div>
  )
}

export default UserDashLIst