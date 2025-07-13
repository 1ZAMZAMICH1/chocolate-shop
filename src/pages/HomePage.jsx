import React from 'react';
import styled from 'styled-components';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import ReviewsSection from '../components/ReviewsSection';
import ContentBlock from '../components/ContentBlock';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      
      <SectionWrapper>
        <ContentBlock 
          image="https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg"
          title="Только лучшие ингредиенты"
          text="Мы используем редкие сорта какао-бобов из Южной Америки и Мадагаскара, натуральные сливки и свежие орехи. Никаких компромиссов, когда речь идет о вкусе."
        />
      </SectionWrapper>
      
      <SectionWrapper hasBackground>
        <FeaturedProducts />
      </SectionWrapper>

      <SectionWrapper>
        <ContentBlock 
          image="https://images.pexels.com/photos/8963462/pexels-photo-8963462.jpeg"
          title="Мастерство в каждой плитке"
          text="Наши шоколатье — настоящие художники. Каждый трюфель и каждая плитка создаются вручную с соблюдением традиционных техник и авторских рецептов."
          reverse={true}
        />
      </SectionWrapper>
      
      <SectionWrapper hasBackground>
        <ReviewsAnchor id="reviews">
          <ReviewsSection />
        </ReviewsAnchor>
      </SectionWrapper>
    </>
  );
};

export default HomePage;

const SectionWrapper = styled.div`
  padding: 3rem 0;
  background: ${({ hasBackground }) => hasBackground ? 'rgba(0,0,0,0.15)' : 'transparent'};
  backdrop-filter: ${({ hasBackground }) => hasBackground ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${({ hasBackground }) => hasBackground ? 'blur(10px)' : 'none'};
`;

const ReviewsAnchor = styled.div`
  scroll-margin-top: 100px;
`;