import React from 'react'
import profilePng from '../../images/Profile.png'
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({review}) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: '#54b8f7',
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        readOnly: true,
        isHalf: true,
      };


    return (
        <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
    )
}

export default ReviewCard
