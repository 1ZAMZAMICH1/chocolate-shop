import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752404631/1234532_qn7vzi.png",
    title: "ChocoPrima",
    subtitle: "Искусство в каждом грамме. Мы превращаем лучшие какао-бобы мира в съедобные шедевры.",
    align: 'left',
    scale: 1,
  },
  {
    image: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752404868/24531_w1kyed.png",
    title: "Чистый вкус",
    subtitle: "Наша философия — это честность ингредиентов и смелость вкусовых сочетаний.",
    align: 'right',
    scale: 1,
  },
  {
    image: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752404634/511323_rhwnvs.png",
    title: "Ручная работа",
    subtitle: "Каждая плитка и каждая конфета созданы вручную с любовью и вниманием к деталям.",
    align: 'left',
    scale: 1,
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [index]);

  const currentSlide = slides[index];
  const isTextLeft = currentSlide.align === 'left';

  return (
    <HeroContainer>
      <AnimatePresence mode="wait">
        <ContentWrapper key={index} $isTextLeft={isTextLeft}>
          <TextContent $isTextLeft={isTextLeft}>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {currentSlide.title}
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              {currentSlide.subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <ShopLink to="/shop">Вся коллекция</ShopLink>
            </motion.div>
          </TextContent>

          <ImageContainer>
            <motion.div
              key={currentSlide.image}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: currentSlide.scale }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src={currentSlide.image} alt={currentSlide.title} />
            </motion.div>
          </ImageContainer>
        </ContentWrapper>
      </AnimatePresence>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(33, 21, 23, 0.85);
  backdrop-filter: blur(8px);
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: ${({ $isTextLeft }) => ($isTextLeft ? 'row' : 'row-reverse')};
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 1600px;
  height: 100%;
  padding: 0 3rem;
  gap: 4rem;
`;

const TextContent = styled.div`
  flex: 1;
  text-align: ${({ $isTextLeft }) => ($isTextLeft ? 'left' : 'right')};

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(4.5rem, 7vw, 7.5rem);
    color: #F5EAE0;
    line-height: 1.05;
    text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.7);
  }

  p {
    font-size: 1.8rem;
    color: var(--text-secondary);
    margin: 3rem 0 4rem;
    max-width: 45ch;
    line-height: 1.7;
    margin-left: ${({ $isTextLeft }) => ($isTextLeft ? '0' : 'auto')};
    margin-right: ${({ $isTextLeft }) => ($isTextLeft ? 'auto' : '0')};
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    max-width: 100%;
    max-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    filter: drop-shadow(10px 15px 25px rgba(0,0,0,0.4));
  }
`;

const ShopLink = styled(Link)`
  display: inline-block;
  padding: 1.5rem 3.5rem;
  border: 1px solid var(--accent);
  color: var(--text-primary);
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent);
    color: var(--bg-dark);
    box-shadow: 0 0 20px rgba(229, 137, 105, 0.4);
  }
`;

export default HeroSection;
