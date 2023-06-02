import React from 'react'
import "./Style/DashBoardNav.css"
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

const DashBoardNav = () => {
    return (
        <div className='dashBoardNavDiv'>
            <nav className='dashBoardNav'>
                <ul className='dashBoardUl'>
                    <div className="leftSideDash">
                        <Link className='dashBoardA' to="/userdash"><li className='dashBoardLi' >Personal Account</li></Link>
                        <Link className='dashBoardA' to="/companyacc"><li className='dashBoardLi' >Company Account</li></Link>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default DashBoardNav