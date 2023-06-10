import { useAppContext } from "../context/appContext"

export const Alert = () => {
  const {alertText, alertType} = useAppContext();
  return (
    <div className={`alert alert-${alertType}`}>{alertText}</div>
  )
}