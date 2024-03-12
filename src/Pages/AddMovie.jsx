import axios from 'axios';
import '../CSS/AddMovie.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify" 

function AddMovie() {
    const [movieName,setMovieName]=useState('');
    const [releaseDate,setReleaseDate]=useState('');
    const navigate = useNavigate();

    const createMovie=()=>{
        axios.post('https://backends-theta.vercel.app/movies',
        {
            movieName: movieName,
            releaseDate: releaseDate,
        })
        .then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }
        })
        navigate('/');
        toast.success("New Movie Added")
    }
  return (
    <div className="add-movie-container">
    <h2 className="add-movie-heading">Add Movie</h2>
        <form onSubmit={createMovie} className="add-movie-form">
        <div className="form-group">
            <label htmlFor="movieName" className="form-label">Movie Name:</label>
            <input
                type="text"
                id="movieName"
                value={movieName}
                required
                onChange={(event) => setMovieName(event.target.value)}
                className="form-input"
            />
        </div>
        <div className="form-group">
            <label htmlFor="releaseDate" className="form-label">Release Date:</label>
            <input
                type="date"
                id="releaseDate"
                value={releaseDate}
                required
                placeholder='YYYY-MM-DD'
                onChange={(event) => setReleaseDate(event.target.value)}
                className="form-input"
            />
        </div>
        <button type="submit" className="btn-submit">Add Movie</button>
        </form>
    </div>  
  )
}

export default AddMovie;