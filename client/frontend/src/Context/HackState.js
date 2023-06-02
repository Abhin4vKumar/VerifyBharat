import React from "react";
import HackContext from "./HackContext";
import { useState } from "react";

const HackState = (props) => {
    const [certificateListState, setCertificateListState] = useState()
    const [employeeListState, setEmployeeListState] = useState()
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [navLi, setNavLi] = useState(
        [{name:"Home", to:"/"},{name:"Features", to:"/"},{name:"About", to:"/about"},{name:"Contact", to:"/contact"}]
    )
    return (
        <HackContext.Provider value={{ certificateListState, setCertificateListState , employeeListState, setEmployeeListState ,account, setAccount,contract, setContract ,provider, setProvider, navLi, setNavLi}}>
            {props.children};
        </HackContext.Provider>
    )
}

export default HackState