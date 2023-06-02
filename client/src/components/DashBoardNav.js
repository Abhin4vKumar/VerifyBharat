import React from 'react'
import "./Style/DashBoardNav.css"
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { useSelector } from 'react-redux';

const DashBoardNav = (props) => {
    console.log(props.user);
    const {loading , isAuthenticated , user} = useSelector((state)=>state.user);
    let companyAcc = false;
    if(!loading){
        if(isAuthenticated){
            if(user.employee){
                console.log(user.employee);
                companyAcc = true;
            }
        }
    }
    console.log(companyAcc)
    return (
        <div className='dashBoardNavDiv'>
            <nav className='dashBoardNav'>
                <ul className='dashBoardUl'>
                    <div className="leftSideDash">
                        <Link className='dashBoardA' to="/dashboard"><li className='dashBoardLi' >Personal Account</li></Link>
                        {companyAcc?
                        <Link className='dashBoardA' to="/companyacc"><li className='dashBoardLi' >Company Account</li></Link>
                        :<></>}
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default DashBoardNav