import React, { Fragment, useEffect } from 'react'
import UserDashLIst from './UserDashLIst'
import DashBoardNav from './DashBoardNav'
import FolderList from './FolderList'
import { useState, useRef, useContext } from 'react'
import Loader from './Loader'
import HackContext from '../Context/HackContext'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyCertificate } from '../actions/certificateAction'


const UserDashboard = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userResult = useSelector((state)=>state.user);
    useEffect(()=>{
        dispatch(getMyCertificate(props.user.id));
    },[dispatch , getMyCertificate , props.user.id])
    const certificatesResult = useSelector((state)=>state.certificates);
    let loading = userResult.loading || certificatesResult.loading
    let isAuthenticated = userResult.isAuthenticated || certificatesResult.isAuthenticated
    if(!loading && !isAuthenticated){
        navigate("/login");
    }
    const certificates=certificatesResult.certificates;
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
        <Fragment>
        {loading? <Loader/> : <Fragment>
            <div>

                <DashBoardNav user={userResult.user} />

                {/* <div ref={folderAddBG} onClick={handleOnCertificatePopupOut} className="certificateOrgToUserShowUp"></div> */}

                <div className="certiList">
                    {certificates ? (certificates.length!=0) ? certificates.map((i,index) => {
                        return <UserDashLIst i={i} givenBy={i.organisation.name} date={i.date} key={index} sno={index} certName={i.name} />
                    }) : <h3>No Certificates Issued</h3> : <h3>No Certificates Issued</h3>}
                </div>
            </div>
        </Fragment>}
        </Fragment>
    )
}

export default UserDashboard