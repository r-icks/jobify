import photo from "../assets/images/not-found.svg"
import Wrapper from "../assets/wrappers/ErrorPage.js"
import { Link } from "react-router-dom"
export const Error = () => {
  return (
    <Wrapper className="full-page">
    <div>
        <img src={photo} alt="ni mila"></img>
        <h3>kuch to bolo</h3>
        <p>kyu hai ye error</p>
        <Link to="/">Back home</Link>
    </div>
    </Wrapper>
  )
}