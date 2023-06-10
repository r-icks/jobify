import Wrapper from "../assets/wrappers/SmallSidebar.js"
import { Logo } from "./Logo.js"
import { useAppContext } from "../context/appContext.js"
import { FaTimes } from "react-icons/fa"
import { NavLinks } from "./"

export const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar && 'show-sidebar'}`}>
        <div className="content">
          <button className="close-btn" onClick={() => { toggleSidebar() }}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
            <NavLinks toggleSidebar={toggleSidebar}/>
        </div>
      </div>
    </Wrapper>
  )
}