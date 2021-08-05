import React, { useState, useEffect } from "react";
import Button from './Button'
import styled from 'styled-components'
import thumb from '../plantThumbImg.svg'
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Wrapper= styled.div`
width:100%;
height:80vh;
position:relative;
overflow-x:hidden;
display: flex;
justify-content:center;
align-items:center;
font-family:${props=>props.theme.font.body};
font-weight:400;
color: ${props=>props.theme.color.grayDark};

& .infoContainer{
  width:80%;
  margin:auto;
  display:flex;
  justify-content: center;
  align-items:center;
}

& .info{
  margin:2rem;
}

& .imgContainer{
  width: 300px;
  margin:2rem;
  

  & img{
    width:100%;
    height:auto;
    object-fit:cover;
  }
};

& button{
  font-size: 1.1rem;
  margin: .5rem auto;
}

& .large{
  
  width:70%;
  position:absolute;
  z-index: 1;
  color: ${props=>props.theme.color.teal};
  left:0;
  margin:0;
  padding:0;
  opacity:.12;
  top:35%;
  transform-origin: center center;
  transform: translate(0,-50%);

  & h1{
  font-family:${props=>props.theme.font.display};
  font-weight:400;
  width:100%;
  font-size:15rem;
  margin:0;
  padding:0;
  }

}
`

const IndividualPlant = (props) => {
  // const {
  //   id,
  //   nickname,
  //   // species,
  //   water_frequency,
  //   // image,
  //   // instructions,
  // } = props.plant;

  const { plantId } = useParams();
  const [plant, setPlant] = useState({});
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth("https://water-my-plants-tt43.herokuapp.com")
      .get(`/api/users/${localStorage.getItem("user")}/plants/${plantId}`)
      .then((res) => setPlant(res.data[0]))
      .catch((err) => console.log(err.response));
  }, [plantId]);

  const handleDelete = (e) => {
    e.preventDefault();

    axiosWithAuth("https://water-my-plants-tt43.herokuapp.com/")
    .delete(`/api/users/${localStorage.getItem('user')}/plants/${plantId}`)
    .then((res)=>{
      //console.log(res)
        push(`/plants`)
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  return (
    <Wrapper>

      <div className='large'><h1>{plant.nickname}</h1></div>
      <div className= 'infoContainer'>
      <div className='imgContainer'>
        <img src={thumb} alt='plant'/>
      </div>


      
        <div className='info'>
          <h3>{plant.nickname}</h3>
          <p>{plant.last_water && plant.last_water.slice(0,10)}</p>
          <p>{plant.species}</p>
          <p>Created By: {plant.user}</p>
          <p>Days between watering: {plant.water_frequency}</p>
          <Button onClick={() => push(`/plant/${plant.user_plants_id}/edit`)} innerText={`Edit ${plant.nickname}`}/>
          <Button onClick={handleDelete} innerText={'Delete'} />
        </div>
        </div>
      
    </Wrapper>
  );
};

export default IndividualPlant;
