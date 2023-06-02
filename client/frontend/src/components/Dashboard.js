import UserDashboard from "./UserDashboard";
import OrgDash from "./OrgDashboard";
import { useEffect, useState , Fragment } from "react";
import { useDispatch , useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
const Dashboard = () =>{
    const navigate = useNavigate();
    const [userOrg , setUserOrg] = useState(true);
    const userResult = useSelector(
        (state) =>state.user
    );
    const orgResult = useSelector(
        (state) =>state.organisation
    );
    //compare results
    if(userResult.isAuthenticated){
        setUserOrg(true);
    }
    if(orgResult.isAuthenticated){
        setUserOrg(false);
    }
    // let loading = !userResult.loading && !orgResult.loading
    // let isAuthenticated = userResult.isAuthenticated || orgResult.isAuthenticated
    let loading = false;
    let isAuthenticated = true;
    if(!loading && !isAuthenticated){
        navigate("/login");
    }
    return (
        <Fragment>
        {loading? <Loader/> : userOrg && isAuthenticated ? <UserDashboard user={userResult.user}/> : isAuthenticated ? <OrgDash user={orgResult.organisation}/> : navigate("/login")}
        </Fragment>
    )
}

export default Dashboard;