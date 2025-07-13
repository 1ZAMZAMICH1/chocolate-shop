import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContentBlock = ({ image, title, text, reverse = false }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, x: reverse ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <BlockContainer ref={ref} reverse={reverse}>
      <ImageWrapper
        variants={imageVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <img src={image} alt={title} />
      </ImageWrapper>
      <TextWrapper
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Title>{title}</Title>
        <Text>{text}</Text>
      </TextWrapper>
    </BlockContainer>
  );
};

export default ContentBlock;

const BlockContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 4rem;
  width: 90%;
  max-width: 1200px;
  margin: 8rem auto;
  
  grid-template-areas: ${({ reverse }) => (reverse ? '"text image"' : '"image text"')};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "image"
      "text";
    gap: 2rem;
    margin: 4rem auto;
  }
`;

const ImageWrapper = styled(motion.div)`
  grid-area: image;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const TextWrapper = styled(motion.div)`
  grid-area: text;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: var(--accent);
    margin-top: 1rem;
  }
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
`;