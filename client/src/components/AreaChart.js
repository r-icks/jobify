import {
    ResponsiveContainer,
    AreaChart,
    Area,
    YAxis,
    XAxis,
    Tooltip,
    CartesianGrid
} from 'recharts'

export const AreaChartMe = ({data}) => {
  return (
    <ResponsiveContainer height={300} width="100%">
    <AreaChart data={data} margin={{top:50}}>
    <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='date'/>
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area dataKey='count' type='monotone' stroke='#2cb1bc' fill='#bef8fd'/>
    </AreaChart>
    </ResponsiveContainer>
  )
}