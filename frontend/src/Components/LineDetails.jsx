import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineDetails = (props) => {
  const data = props.lineData
  return (
    <>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
      <LineChart width={100} height={100} data={data}
        margin={{
          top: 30,
          right: 30,
          left: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Register Users" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Active Users" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default LineDetails