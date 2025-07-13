import React from 'react';
import styled from 'styled-components';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import ReviewsSection from '../components/ReviewsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      
      <SectionWrapper>
        <AboutSection />
      </SectionWrapper>
      
      <SectionWrapper hasBackground>
        <FeaturedProducts />
      </SectionWrapper>

      <SectionWrapper>
        <ContactSection />
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
`;

const ReviewsAnchor = styled.div`
  scroll-margin-top: 100px;
`;