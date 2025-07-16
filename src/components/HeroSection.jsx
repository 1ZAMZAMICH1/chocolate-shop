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
    scale: 1, // Идеальный размер
  },
  {
    image: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752404868/24531_w1kyed.png",
    title: "Чистый вкус",
    subtitle: "Наша философия — это честность ингредиентов и смелость вкусовых сочетаний.",
    align: 'right',
    scale: 0.85, // ЧУТЬ БОЛЬШЕ
  },
  {
    image: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752404634/511323_rhwnvs.png",
    title: "Ручная работа",
    subtitle: "Каждая плитка и каждая конфета созданы вручную с любовью и вниманием к деталям.",
    align: 'left',
    scale: 0.85, // ЧУТЬ БОЛЬШЕ
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
        <ContentWrapper key={index}>
          <TextContent $isTextLeft={isTextLeft}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}>
              <h1>{currentSlide.title}</h1>
              <p>{currentSlide.subtitle}</p>
              <ShopLink to="/shop">Вся коллекция</ShopLink>
            </motion.div>
          </TextContent>
          <ImageContainer $isTextLeft={isTextLeft}>
             <motion.div
                key={currentSlide.image}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: currentSlide.scale }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={currentSlide.image} alt={currentSlide.title} />
              </motion.div>
          </ImageContainer>
        </ContentWrapper>
      </AnimatePresence>
    </HeroContainer>
  );
};

export default HeroSection;

// --- СТИЛИ С ИСПРАВЛЕНИЯМИ ТОЛЬКО ДЛЯ ДЕСКТОПА ---

const HeroContainer = styled.section` height: 100vh; width: 100%; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; background-color: rgba(33, 21, 23, 0.85); backdrop-filter: blur(8px); `;
const ContentWrapper = styled(motion.div)`
  width: 90%; max-width: 1600px; height: 100%; display: flex; align-items: center; gap: 3rem;
  @media (max-width: 768px) {
    flex-direction: column; justify-content: center; text-align: center; gap: 1rem; padding: 5rem 0;
  }
`;
const TextContent = styled.div`
  flex: 1 1 50%; /* ИЗМЕНЕНИЕ: текст и картинка занимают по 50% */
  order: ${props => (props.$isTextLeft ? 1 : 2)};
  text-align: ${props => (props.$isTextLeft ? 'left' : 'right')};
  
  /* ИЗМЕНЕНИЕ: добавляем внутренние отступы, чтобы сместить текст от краев */
  padding: 0 5%; 

  @media (max-width: 768px) {
    order: 2; text-align: center; flex-basis: auto; display: flex; flex-direction: column; align-items: center; padding: 0;
  }
  
  h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(3.5rem, 7vw, 7.5rem); color: #F5EAE0; line-height: 1.05; text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.7); }
  p { font-size: clamp(1.6rem, 2vw, 1.8rem); color: var(--text-secondary); margin: 2rem 0 3rem; max-width: 45ch; line-height: 1.7; 
    ${props => !props.$isTextLeft && `margin-left: auto;`}
    @media (max-width: 768px) {
      margin: 1.5rem auto 2.5rem;
    }
  }
`;
const ImageContainer = styled.div`
  flex: 1 1 50%; /* ИЗМЕНЕНИЕ: текст и картинка занимают по 50% */
  order: ${props => (props.$isTextLeft ? 2 : 1)};
  display: flex; justify-content: center; align-items: center;
  
  @media (max-width: 768px) {
    order: 1; flex-basis: auto; width: 80%;
  }
  
  & > div { display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; }
  img { max-width: 100%; max-height: 90vh; object-fit: contain; filter: drop-shadow(10px 15px 25px rgba(0,0,0,0.4)); }
`;
const ShopLink = styled(Link)` display: inline-block; padding: 1.2rem 2.5rem; border: 1px solid var(--accent); color: var(--text-primary); font-size: 1.6rem; font-weight: 600; border-radius: 50px; transition: all 0.3s ease; &:hover { background: var(--accent); color: var(--bg-dark); } `;