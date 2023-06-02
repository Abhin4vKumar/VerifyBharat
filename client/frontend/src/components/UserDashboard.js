import React, { useEffect } from 'react'
import UserDashLIst from './UserDashLIst'
import DashBoardNav from './DashBoardNav'
import FolderList from './FolderList'
import { useState, useRef, useContext } from 'react'
import HackContext from '../Context/HackContext'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyCertificate } from '../actions/certificateAction'



const folderList = [
    "folder1",
    "folder2",
    "folder3",
    "folder4",
    "folder5"
]

const UserDashboard = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(getMyCertificate(props.user.id));
    },[dispatch , getMyCertificate , props.user.id])
    const {loading , certificates} = useSelector((state)=>state.certificates);
    const userResult = useSelector((state)=>state.user);
    // const context = useContext(HackContext)
    // const { certificateListState ,setCertificateListState} = context;
    // setCertificateListState(certificates)

    const folderAddBG = useRef()
    const folderAdd = useRef()

    const handleOnCertificatePopupOut = ()=>{
        folderAdd.current.style.display = "none"
        folderAddBG.current.style.display = "none"
    }
    return (

        <div>
            <DashBoardNav />

            {/* <div ref={folderAddBG} onClick={handleOnCertificatePopupOut} className="certificateOrgToUserShowUp"></div> */}

            <div className="certiList">
                {certificates ? (certificates.length!=0) ? certificates.map((i,index) => {
                    return <UserDashLIst i={i} givenBy={i.organisation.name} date={i.date} key={index} sno={index} certName={i.name} />
                }) : <h3>No Certificates Issued</h3> : <h3>No Certificates Issued</h3>}
            </div>
        </div>

    )
}

export default UserDashboard