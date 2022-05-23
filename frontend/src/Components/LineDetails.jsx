import { Container, Typography } from '@mui/material';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineDetails = () => {

    const data = [
        {
          name: 'Point A',
          "Active Users": 4000,
          "Register Users": 2400,
          amt: 2400,
        },
        {
          name: 'Point B',
          "Active Users": 3000,
          "Register Users": 1398,
          amt: 2210,
        },
        {
          name: 'Point C',
          "Active Users": 2000,
          "Register Users": 9800,
          amt: 2290,
        },
        {
          name: 'Point D',
          "Active Users": 2780,
          "Register Users": 3908,
          amt: 2000,
        },
        {
          name: 'Point E',
          "Active Users": 1890,
          "Register Users": 4800,
          amt: 2181,
        },
        {
          name: 'Point F',
          "Active Users": 2390,
          "Register Users": 3800,
          amt: 2500,
        },
        {
          name: 'Point G',
          "Active Users": 3490,
          "Register Users": 4300,
          amt: 2100,
        },
      ];

  return (
    <div>
        <Typography>Line Chart</Typography>
        <Container>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart width={100} height={100} data={data}
          margin={{
            right: 30,
            left: 20,
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
        </Container>
    </div>
  )
}

export default LineDetails