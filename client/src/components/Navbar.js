import React, { useState } from "react";
import "./Style/Navbar.css";
import { useRef } from "react";
import { useContext } from "react";
import HackContext from "../Context/HackContext";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import { useAlert } from 'react-alert';
import Logo from "./stock/Logo.svg"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LinkOfNavbar from "./LinkOfNavbar";

const Navbar = () => {

  const handleOnLinkMouseOverNav = () => {

  }
  const [colorOfStatus, setColorOfStatus] = useState()
  const alert = useAlert();
  const context = useContext(HackContext);
  const { account, setAccount, setContract, setProvider, navLi } = context;
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  async function connectWebsite() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (provider) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

            {/* <Link to = "/userdash" className='navA' href=""><li className='navLi'>Dashboard</li></Link>
                    <Link to = "/orgdash" className='navA' href=""><li className='navLi'>Organisation</li></Link> */}
            {/* <a className='navA gapNavA' href=""><li className='navLi'></li></a> */}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input className="connectWallBtn" style={{ border: "1px solid grey", color: "white", marginRight: "10px" }}
              type="button"
              onClick={connectWebsite}
              value={"Connect Wallet"}
            />
            <div className="connectedStatusDiv">
              <p style={{ color: "white" }}>
                {account ? "Connected" : "Not Connected"}
              </p>
              <div style={{backgroundColor:account?"#00d700":"red"}} className="connectedStatusColor"></div>

            </div>
          </div>
          <div
            className="rightNavSide"
            onMouseOver={handleOnAccountHover}
            onMouseOut={handleOnAccountOut}
          >
            <a className="navA" href="">
              <li className="navLi">
                <box-icon
                  name="user-circle"
                  type="solid"
                  color="white"
                  flip="horizontal"
                ></box-icon>
              </li>
            </a>
            <div className="accountList" ref={accountDisp}>
              <ul className="accountListUl">
                <Link to="/login" className="accountListA" href="">
                  {!loading && isAuthenticated ? <li>Dashboard</li> : <li>Login</li>}
                </Link>
                {loading ? <Link to="/login" className="accountListA" href="">
                  <li>Register</li>
                </Link> : isAuthenticated ? <Link to="/logout" className="accountListA" href="">
                  <li>Logout</li>
                </Link> : <Link to="/login" className="accountListA" href="">
                  <li>Register</li>
                </Link>}
              </ul>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
