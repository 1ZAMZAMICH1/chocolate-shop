import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import StarRating from './StarRating';
import { getData, updateData } from '../api/gist';

const ReviewForm = ({ onReviewAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!name || !text || rating === 0) {
      setError('Пожалуйста, заполните имя, текст отзыва и поставьте оценку.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      const currentData = await getData();
      const newReview = {
        id: `rev${Date.now()}`,
        name,
        email,
        text,
        rating,
        date: new Date().toISOString(),
      };
      
      const updatedData = {
        ...currentData,
        reviews: [newReview, ...currentData.reviews],
      };

      await updateData(updatedData);
      
      setName('');
      setEmail('');
      setText('');
      setRating(0);
      onReviewAdded(newReview);

    } catch (err) {
      setError('Не удалось отправить отзыв. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, text, rating, onReviewAdded]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Оставить отзыв</h2>
      <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input type="email" placeholder="Ваш Email (не будет опубликован)" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Textarea placeholder="Текст отзыва" value={text} onChange={(e) => setText(e.target.value)} required />
      <StarRating rating={rating} setRating={setRating} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </SubmitButton>
    </FormContainer>
  );
};

export default ReviewForm;

const FormContainer = styled.form`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  background: var(--ui-background);
  border-radius: 10px;
  border: 1px solid var(--ui-border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #444;
  background: #222;
  color: var(--text-primary);
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #444;
  background: #222;
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  border-radius: 5px;
  border: none;
  background: var(--accent);
  color: var(--bg-dark);
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
`;