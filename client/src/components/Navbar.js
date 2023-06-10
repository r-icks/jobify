import Wrapper from "../assets/wrappers/Navbar.js"
import { useState } from "react"
import {FaAlignLeft, FaUserCircle, FaCaretDown} from "react-icons/fa"
import { useAppContext } from "../context/appContext.js"
import { Logo } from "./Logo.js"

export const Navbar = () => {
    const {toggleSidebar, logoutUser, user}=useAppContext()
    const [showDropdown, toggleShowDropDown] = useState(false);
    return (
        <Wrapper>
        <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
            <FaAlignLeft/>
        </button>

        <div>
            <Logo />
            <h3 className="logo-text"> dashboard </h3>
        </div>

        <div className="btn-container">
            <button className='btn' onClick={()=>{
                toggleShowDropDown(()=>{
                    return !showDropdown
                })
            }}>
                <FaUserCircle />
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={`dropdown ${showDropdown && 'show-dropdown'}`}>
                <button onClick={()=>{logoutUser()}} className="dropdown-btn">
                        Logout
                </button>
            </div>
        </div>

        </div>
        </Wrapper>
    )
}