import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useParams } from 'react-router-dom';
const Revenue = () => {
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const user = {user:id};
  const cardStyle = {
    fontSize: '24px',
    border: '2px solid #000',
    width: '300px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column', // Use flex column layout
    borderRadius: '10px',
    padding: '10px',
    position: 'relative', // Use relative positioning for the card
  };

  const headingStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '10px',
    left: '10px', 
  };

  const valueStyle = {
    fontSize: '36px',
    position: 'absolute',
    top: '80px',
    left: '30px', 

};
const [revenue, setRevenue] = useState(0);
useEffect(() => {
  setLoading(true);
  axios
    .get(`http://localhost:5555/dashboard/totalrevenue/`,{params:user})
    .then((response) => {

      const data = response.data;
      console.log(data)
        if (data.length > 0) {
          setRevenue(data[0].totalSales);
        }
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
}, []);

  return (
    <div style={cardStyle}>
      <div style={headingStyle}>
        Revenue
      </div>
      <div style={valueStyle}>
        ${revenue}
      </div>
    </div>
  );
}

export default Revenue;
