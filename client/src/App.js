import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import UserOrg from "./components/UserOrg";
import UploadProfile from "./components/UploadProfile";
import UserDashboard from "./components/UserDashboard";
import OrgDashboard from "./components/OrgDashboard";
import Navbar from "./components/Navbar";
import "./App.css"
import CompanyAccUserDash from "./components/CompanyAccUserDash";
import ClickAfterCompanyUser from "./components/ClickAfterCompanyUser";
import HackState from "./Context/HackState";
import Account from "./components/Account";
import Home from "./components/home/Home";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import LoginPage from "./components/loginRegis";
import About from "./components/About";
import Logout from "./components/logout";

function App() {
  return (
    <>
      <HackState>
        <BrowserRouter>
          {/* <Chatbot /> */}
          {/* <Navbar /> */}
          <Navbar />
          <Routes>
            {/* <Route exact path="/" element={<Home />} /> */}

            <Route exact path="/account" element={<Account />} />
            <Route exact path="/contact" element={<Contact />} />

            <Route exact path="/" element={<Home />} />
            <Route exact path="/companyacc" element={<CompanyAccUserDash />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/userdash" element={<Dashboard />} />
            <Route exact path="/orgdash" element={<Dashboard />} />
            <Route exact path="/select" element={<UserOrg />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/upload" element={<UploadProfile />} />
            <Route exact path="/clickafteruser" element={<ClickAfterCompanyUser />} />


          </Routes>
          <Footer/>
        </BrowserRouter>
      </HackState>
    </>

  );
}

export default App;