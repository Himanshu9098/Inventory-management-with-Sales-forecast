import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const ProductCount = () => {
  const [loading, setLoading] = useState(false);
  const {id} =useParams();
  const cardStyle = {
    border: '2px solid #000',
    fontSize: '24px',
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
    left: '120px', 

};
const [count,setCount] = useState(0);
useEffect(() => {
  setLoading(true);
  axios
  .get(`http://localhost:5555/products/?user=${id}`)
  .then((response) => {
      setCount(response.data.count);
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
        No. of Products:
      </div>
      <div style={valueStyle}>
        {count}
      </div>
    </div>
  );
}

export default ProductCount;
