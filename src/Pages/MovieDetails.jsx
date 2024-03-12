import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/MovieDetails.css'

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`https://backends-theta.vercel.app/movies/${id}`)
            .then((response) => {
                console.log(response.data);
                setMovie(response.data);
                setReviews(response.data.Reviews);
            })
            .catch(error => {
                console.error("Error fetching movie details:", error);
            });
    }, [id]);

    return (
        <div className="movie-details">
            {movie && (
                <div className="movie-info">
                    <div className="movie-header">
                        <h2 className="movie-title">
                            {movie.movieName}</h2>
                        <p className="avg-rating">
                            Average Rating: 
                            <span className="rating">
                                {movie.avgRating}/10</span>
                        </p>
                    </div>
                </div>
            )}

            <div className="reviews-container">
                <h3 className="reviews-heading">Reviews</h3>
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p className="review-comments">
                            {review.reviewComments}
                        </p>
                        <p className="reviewer-name">
                            By : {review.reviewerName}
                        </p>
                        <p className="review-rating">
                            Rating: <span className="rating"
                            >{review.rating}/10</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieDetails;
