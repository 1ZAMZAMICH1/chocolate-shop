import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getData, updateData } from '../api/gist';
import toast from 'react-hot-toast';
import StarRating from './StarRating';

// Простая функция для проверки email
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const ReviewForm = ({ onReviewAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!name || !text || rating === 0) {
      toast.error('Пожалуйста, заполните имя, текст и поставьте оценку.');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Пожалуйста, введите корректный Email.');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Публикуем ваш отзыв...');

    try {
      const currentData = await getData();
      const newReview = {
        id: `rev${Date.now()}`,
        name,
        email, // Email сохраняется, но не отображается
        text,
        rating,
        date: new Date().toISOString(),
        isApproved: true, // Отзыв сразу одобрен
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
      toast.dismiss(loadingToast);
      toast.success('Спасибо за ваш отзыв!');
      onReviewAdded(newReview);

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Не удалось отправить отзыв. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, text, rating, onReviewAdded]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>Оставить отзыв</h3>
      <InputGrid>
        <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input type="email" placeholder="Ваш Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </InputGrid>
      <Textarea placeholder="Напишите, что вы думаете о нашей работе..." value={text} onChange={(e) => setText(e.target.value)} required />
      <RatingAndButtonWrapper>
        <StarRating rating={rating} setRating={setRating} />
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Публикация...' : 'Опубликовать отзыв'}
        </SubmitButton>
      </RatingAndButtonWrapper>
    </FormContainer>
  );
};

export default ReviewForm;

const FormContainer = styled.form`
  width: 100%; max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;
  h3 { font-size: 2.5rem; font-family: 'Cormorant Garamond', serif; }
`;

const InputGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
`;

const Input = styled.input`
  width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid #444; background: #222; color: var(--text-primary); font-size: 1.6rem;
  &:focus { outline: none; border-color: var(--accent); }
`;

const Textarea = styled.textarea`
  width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid #444; background: #222; color: var(--text-primary); font-size: 1.6rem; min-height: 120px; resize: vertical;
  &:focus { outline: none; border-color: var(--accent); }
`;

const RatingAndButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem; border-radius: 8px; border: none; background: var(--accent); color: var(--bg-dark); font-size: 1.6rem; font-weight: 700; cursor: pointer; transition: opacity 0.3s ease; white-space: nowrap;
  &:hover { opacity: 0.9; }
  &:disabled { background: #555; cursor: not-allowed; }
`;