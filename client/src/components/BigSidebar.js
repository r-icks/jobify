import Wrapper from "../assets/wrappers/BigSidebar.js"
import { useAppContext } from "../context/appContext.js"
import { Logo } from "./Logo.js"
import { NavLinks } from "./NavLinks.js"

export const BigSidebar = () => {
  const {showSidebar}=useAppContext()
  return (
    <Wrapper>
    <div className={`sidebar-container ${!showSidebar && 'show-sidebar'}`}>
      <div className="content">
        <header>
          <Logo />
        </header>
        <NavLinks toggleSidebar={()=>{}}/>
      </div>
    </div>
    </Wrapper>
  )
}