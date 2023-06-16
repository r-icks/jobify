import { AreaChartMe } from "./AreaChart.js"
import { BarChartme } from "./BarChart.js"
import Wrapper from "../assets/wrappers/ChartsContainer.js"
import {useAppContext} from "../context/appContext.js"
import { useState } from "react"

export const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const {monthlyApplications: data} = useAppContext()
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={()=>{setBarChart(!barChart)}}>
        {barChart? 'Area Chart':'Bar Chart'}
      </button>
      {barChart ? <BarChartme data={data} /> : <AreaChartMe data={data} />}
    </Wrapper>
  )
}