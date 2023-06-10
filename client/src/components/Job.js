import moment from "moment"
import Wrapper from "../assets/wrappers/Job.js"
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useAppContext } from "../context/appContext"
import JobInfo from "./JobInfo"

export const Job = ({
    _id,
    position,
    company,
    jobLocation,
    createdAt,
    status,
    jobType
}) => {

    const { setEditJob, deleteJob } = useAppContext()

    let date = moment(createdAt)
    date = date.format('MMM Do, YYYY')
    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>

            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <div className={`status ${status}`}> {status} </div>
                </div>

                <footer>
                    <div className="actions">
                        <Link to='/add-job'
                            onClick={() => {
                                setEditJob(_id)
                            }} className="btn edit-btn"> Edit </Link>

                        <button className="btn delete-btn" type="button" onClick={() => {
                            deleteJob(_id)
                        }} >
                            Delete
                        </button>

                    </div>
                </footer>
            </div>
        </Wrapper>
    )
}