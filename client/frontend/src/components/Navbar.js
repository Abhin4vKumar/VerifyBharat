import React from "react";
import "./Style/Navbar.css";
import { useRef } from "react";
import { useContext } from "react";
import HackContext from "../Context/HackContext";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import Logo from "./stock/Logo.svg"

import { Link } from "react-router-dom";

const Navbar = () => {
  const context = useContext(HackContext);
  const { account, setAccount, setContract, setProvider, navLi, setNavLi } =
    context;
  async function connectWebsite() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (provider) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      console.log(address);
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

      const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
      //console.log(contract);
      setContract(contract);
      setProvider(provider);
      // const tx= await signer.sendTransaction({
      //   to: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      //   value: ethers.utils.parseEther("3")
      // });
    } else {
      console.error("Metamask is not installed");
    }
  }
  const accountDisp = useRef();
  const handleOnAccountHover = () => {
    accountDisp.current.style.opacity = "1";
    accountDisp.current.style.transform = "translateY(-5px)";
  };

  const handleOnAccountOut = () => {
    accountDisp.current.style.opacity = "0";
    accountDisp.current.style.transform = "translateY(-10px)";
  };
  return (
    <div className="navBar">
      <nav className="navClass">
        <ul className="navUl">
          <div className="leftNavSide">
            <Link to="/" className="navA logoA" href="">
              <li className="navLi logoLi ">
                <img className="logo" src={Logo} alt="" />{" "}
                <div className="logoText">VerifyBharat</div>
              </li>
            </Link>
            {navLi.map((i) => {
              return (
                <Link to={i.to} className="navA" href="">
                  <li
                    dangerouslySetInnerHTML={{ __html: i.name }}
                    className="navLi"
                  ></li>
                </Link>
              );
            })}

            {/* <Link to = "/userdash" className='navA' href=""><li className='navLi'>Dashboard</li></Link>
                    <Link to = "/orgdash" className='navA' href=""><li className='navLi'>Organisation</li></Link> */}
            {/* <a className='navA gapNavA' href=""><li className='navLi'></li></a> */}
          </div>
          <div>
            <input
              type="button"
              onClick={connectWebsite}
              value={"Connect Wallet"}
            />
            <p style={{ color: "white" }}>
              {account ? account : "Not Connected"}
            </p>
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
                <Link to="/select" className="accountListA" href="">
                  <li>Login</li>
                </Link>
                <Link to="/select" className="accountListA" href="">
                  <li>Register</li>
                </Link>
              </ul>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
