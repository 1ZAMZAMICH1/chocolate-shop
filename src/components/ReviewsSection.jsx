import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { getData } from '../api/gist';
import ReviewForm from './ReviewForm';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const StarDisplay = ({ rating }) => ( <StarWrapper>{[...Array(5)].map((_, i) => (<span key={i} className={i < rating ? 'filled' : ''}>★</span>))}</StarWrapper> );
const ReviewCard = ({ review }) => ( <Card><StarDisplay rating={review.rating} /><ReviewText>"{review.text}"</ReviewText><ReviewerName>— {review.name}</ReviewerName></Card> );

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getData();
        setReviews(data.reviews.filter(r => r.isApproved !== false) || []);
      } catch (error) { console.error("Не удалось загрузить отзывы"); }
    };
    fetchReviews();
  }, []);

  const handleScroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = 350; // Прокрутка на ширину одной карточки + отступ
      scrollerRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };
  
  const MIN_ITEMS_FOR_SCROLL = 6;
  let displayReviews = [...reviews];
  if (reviews.length > 0 && reviews.length < MIN_ITEMS_FOR_SCROLL) {
    while (displayReviews.length < MIN_ITEMS_FOR_SCROLL) {
      displayReviews = [...displayReviews, ...reviews];
    }
  }
  const duplicatedReviews = [...displayReviews, ...displayReviews];

  return (
    <SectionContainer>
      <Header>
        <Title>Что говорят наши клиенты</Title>
        <Controls>
          <ControlButton onClick={() => handleScroll(-1)}><FaChevronLeft /></ControlButton>
          <ControlButton onClick={() => handleScroll(1)}><FaChevronRight /></ControlButton>
        </Controls>
      </Header>
      
      {reviews.length > 0 ? (
        <ScrollerContainer ref={scrollerRef}>
          <Scroller $itemCount={displayReviews.length}>
            {duplicatedReviews.map((review, index) => <ReviewCard key={`${review.id}-${index}`} review={review} />)}
          </Scroller>
        </ScrollerContainer>
      ) : ( <p>Отзывов пока нет. Станьте первым!</p> )}

      <FormWrapper>
        <ReviewForm onReviewAdded={(newReview) => setReviews(prev => [newReview, ...prev])} />
      </FormWrapper>
    </SectionContainer>
  );
};
export default ReviewsSection;
// ...СТИЛИ
const SectionContainer = styled.section` width: 100%; padding: 8rem 0; overflow: hidden; `;
const Header = styled.div` max-width: 1400px; margin: 0 auto 4rem; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; `;
const Title = styled.h2` font-family: 'Cormorant Garamond', serif; font-size: 4.2rem; `;
const Controls = styled.div` display: flex; gap: 1rem; `;
const ControlButton = styled.button` background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); width: 40px; height: 40px; border-radius: 50%; color: var(--text-primary); cursor: pointer; display: flex; justify-content: center; align-items: center; transition: background-color 0.3s; &:hover { background: var(--accent); color: var(--bg-dark); } `;
const scroll = keyframes` 0% { transform: translateX(0); } 100% { transform: translateX(calc(-350px * var(--item-count))); } `;
const ScrollerContainer = styled.div`
  width: 100%;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  overflow-x: auto; /* ВОТ ОНО. ГЛАВНОЕ ИСПРАВЛЕНИЕ */
  &::-webkit-scrollbar { display: none; } /* Скрываем скроллбар */
  -ms-overflow-style: none;  /* IE и Edge */
  scrollbar-width: none;  /* Firefox */
`;
const Scroller = styled.div` --item-count: ${props => props.$itemCount}; display: flex; gap: 2rem; width: calc(350px * var(--item-count) * 2); animation: ${scroll} 60s linear infinite; &:hover { animation-play-state: paused; } padding: 0 1rem; `;
const Card = styled.div` flex-shrink: 0; width: 330px; height: 220px; background: rgba(255, 255, 255, 0.03); border-radius: 15px; padding: 2rem; border: 1px solid rgba(255, 255, 255, 0.1); display: flex; flex-direction: column; `;
const StarWrapper = styled.div` color: #444; font-size: 1.5rem; span.filled { color: #ffc107; } `;
const ReviewText = styled.p` font-size: 1.6rem; color: #ccc; line-height: 1.6; margin: 1rem 0; flex-grow: 1; font-style: italic; `;
const ReviewerName = styled.h3` font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: var(--text-primary); align-self: flex-end; `;
const FormWrapper = styled.div` margin-top: 6rem; padding: 0 5%; `;