import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from './Button'
import {FormContainer} from './FormContainer'
import {axiosWithAuth} from "../utils/axiosWithAuth"

const PlantForm = (props) => {
    const {push} = useHistory();

    const [plant, setPlant] = useState({
        species: "",
        nickname: "",
        water_frequency: "",  
    })

    const { plantId } = useParams()
    const userID = localStorage.getItem("user")

    useEffect(()=>{
        axiosWithAuth("https://water-my-plants-tt43.herokuapp.com/")
        .get(`/api/users/${userID}/plants/${plantId}`)
        .then((res)=>{
            console.log(res)
            setPlant({
                ...plant,
                species: res.data[0].species,
                nickname: res.data[0].nickname,
                water_frequency: res.data[0].water_frequency
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [plantId, plant, userID])

    const handleChange = (e) => {
        setPlant({
            ...plant,
            [e.target.name]: e.target.value
        })
    }
    

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosWithAuth("https://water-my-plants-tt43.herokuapp.com/")
        .put(`/api/users/${userID}/plants/${plantId}`, plant)
        .then((res)=>{
            push(`/plant/${plantId}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <FormContainer>
            <h2>Edit Plant</h2>
           <div className='formContainer'>
           <form onSubmit={handleSubmit}>
                    <label htmlFor='species'>species</label>
                        <input 
                            type="text"
                            name="species"
                            value={plant.species}
                            onChange={handleChange}
                        />
                    

                    <label htmlFor='nickname'>nickname</label>
                        <input 
                            type="text"
                            name="nickname"
                            value={plant.nickname}
                            onChange={handleChange}
                        />
                    

                    <label htmlFor='water_frequency'>water frequency</label>
                        <input 
                            type="text"
                            name="water_frequency"
                            value={plant.water_frequency}
                            onChange={handleChange}
                        />

                    <div className='button'>
                        <Button type='sumbit' innerText={'save'}/>
                        <Button onClick={()=>push(`/plant/${plantId}`)} innerText={'Cancel'}/>
                    </div>
        
            </form>
           </div>
        </FormContainer>
    )
}

export default PlantForm;