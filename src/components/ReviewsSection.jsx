// src/components/ReviewsSection.jsx
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { getData } from '../api/gist';
import ReviewForm from './ReviewForm';

const StarDisplay = ({ rating }) => (
  <div>
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffc107' : '#555', fontSize: '1.2rem' }}>★</span>
    ))}
  </div>
);


const ReviewCard = ({ review }) => (
  <Card>
    <CardHeader>
      <ReviewerName>{review.name}</ReviewerName>
      <StarDisplay rating={review.rating} />
    </CardHeader>
    <ReviewText>"{review.text}"</ReviewText>
  </Card>
);

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getData();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Не удалось загрузить отзывы");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Функция для оптимистичного обновления UI
  const handleReviewAdded = useCallback((newReview) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
  }, []);

  if (isLoading) {
    return <p>Загрузка отзывов...</p>;
  }

  return (
    <SectionContainer>
      <h2>Отзывы наших клиентов</h2>
      <ReviewsGrid>
        {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
      </ReviewsGrid>
      <ReviewForm onReviewAdded={handleReviewAdded} />
    </SectionContainer>
  );
};

export default ReviewsSection;

// Стили
const SectionContainer = styled.section`
  width: 90%;
  max-width: 1200px;
  margin: 5rem auto;
  text-align: center;
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewerName = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: #f0e6e6;
`;

const ReviewText = styled.p`
  font-style: italic;
  color: #ccc;
  line-height: 1.6;
`;