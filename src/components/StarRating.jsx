// src/components/StarRating.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Star = ({ filled, onClick }) => (
  <span onClick={onClick} style={{ color: filled ? '#ffc107' : '#e4e5e9', cursor: 'pointer', fontSize: '2rem' }}>
    ★
  </span>
);

const StarRating = ({ rating, setRating }) => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <Star key={index} filled={index < rating} onClick={() => setRating(index + 1)} />
      ))}
    </div>
  );
};

export default StarRating;