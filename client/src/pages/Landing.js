import { Logo } from "../components"
import main from "../assets/images/main.svg"
import Wrapper from "../assets/wrappers/Testing.js"
import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className="container page">
        {/* INFO */}
            <div className="info">
            <h1>
                Job <span>Tracking</span> App
            </h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <Link to="/register" className="btn btn-hero">Login/Register</Link>
            </div>
        {/* Image */}
        <img src={main} alt="job hunt" className="img main-img" />
        </div>
    </Wrapper>
  )
}
export default Landing