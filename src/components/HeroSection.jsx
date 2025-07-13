import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <HeroContainer>
      <TextContent>
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Шоколад как искусство
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Откройте для себя мир ремесленного шоколада, где каждый кусочек рассказывает свою историю.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ShopLink to="/shop">Вся коллекция</ShopLink>
        </motion.div>
      </TextContent>
      <ImageContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageWrapper>
            <img src="https://res.cloudinary.com/dyuywnfy3/image/upload/v1752239484/343aa491-8845-413b-9660-176fdc32fdf1.png" alt="Handmade chocolate"/>
          </ImageWrapper>
        </motion.div>
      </ImageContent>
    </HeroContainer>
  );
};

export default HeroSection;

const HeroContainer = styled.section`
  min-height: 90vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
  padding: 120px 5% 50px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
    min-height: auto;
    padding-top: 150px;
    padding-bottom: 80px;
  }
`;

const TextContent = styled.div`
  @media (max-width: 900px) {
    order: 2;
  }
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 7vw, 5rem);
    color: var(--text-primary);
    line-height: 1.1;
  }
  p {
    font-size: 1.2rem;
    color: var(--text-secondary);
    max-width: 450px;
    margin: 2rem 0;
    @media (max-width: 900px) {
      margin: 2rem auto;
    }
  }
`;

const ShopLink = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  border: 2px solid var(--accent);
  color: var(--accent);
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  &:hover {
    background: var(--accent);
    color: var(--bg-dark);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
  }
`;

const ImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    order: 1;
    margin-bottom: 2rem;
  }
`;

const ImageWrapper = styled.div`
  width: clamp(300px, 40vw, 500px);
  height: clamp(300px, 40vw, 500px);
  filter: drop-shadow(0px 30px 20px rgba(0,0,0,0.3));
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;