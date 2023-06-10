import { FormRow, Alert, FormSelect } from "../../components"
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/DashboardFormPage"

export const AddJob = () => {
   const {
    showAlert,
    isEditing,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    isLoading
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    // if(!position || !company || !jobLocation){
    //   displayAlert()
    //   return
    // }
    if(isEditing){

      return
    }
    createJob()
  }

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name, value});
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>
          {isEditing ? 'edit job' : 'add job'}
        </h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow type='text' name='position' value={position} 
          handleChange={handleJobInput} />
          <FormRow type='text' name='company' value={company} 
          handleChange={handleJobInput} />
          <FormRow type='text' name='jobLocation' value={jobLocation} 
          labelText='Job Location' handleChange={handleJobInput} />

          <FormSelect name="jobType" value={jobType} labelText="job type" 
          handleChange={handleJobInput} list={jobTypeOptions} />

          <FormSelect name="status" value={status}
          handleChange={handleJobInput} list={statusOptions} />

        <div className="btn-container">
          <button className="btn btn-block submit-btn" type="submit" 
          disabled={isLoading} onClick={handleSubmit}>
            submit
          </button>
          <button className="btn clear-btn" onClick={(e)=>{
            e.preventDefault()
            clearValues()
          }} disabled={isLoading}>
            clear
          </button>
        </div>

        </div>
      </form>
    </Wrapper>
  )
}