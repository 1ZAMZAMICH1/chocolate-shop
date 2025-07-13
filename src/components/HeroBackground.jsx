// src/components/HeroBackground.jsx

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BackgroundContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1; // Уводим фон за основной контент
`;

const BackgroundImage = styled.img`
  position: absolute;
  object-fit: contain;
  background-color: transparent !important; // Гарантия отсутствия фона
  will-change: transform, opacity; // Подсказка браузеру для плавной анимации
`;

// Массив с твоими изображениями и их параметрами
const imagesConfig = [
  { src: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752349310/412e94d4-afc5-4611-a150-df9c22f39582.png", top: '5%', left: '75%', width: '30vw', rotate: 15, blur: 2, opacity: 0.6 },
  { src: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752349315/d4818509-f0ed-4293-9c00-b8d173cb24e3.png", top: '60%', left: '-5%', width: '25vw', rotate: -20, blur: 3, opacity: 0.5 },
  { src: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752349560/04b86e2f-38b7-49f5-8bd3-f0709534dd1a.png", top: '50%', left: '85%', width: '20vw', rotate: 35, blur: 4, opacity: 0.7 },
  { src: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752349547/8d7419bf-2798-44de-bcf0-aa7b61941829.png", top: '5%', left: '5%', width: '22vw', rotate: 5, blur: 1, opacity: 0.8 },
  { src: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752349742/34b12caa-e3ea-4fb9-bb1c-21af58548302.png", top: '-15%', left: '40%', width: '35vw', rotate: -5, blur: 5, opacity: 0.4 },
  { src: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752349750/ae1a68aa-3c98-4183-a300-1041c750c2ec.png", top: '70%', left: '45%', width: '28vw', rotate: 10, blur: 2, opacity: 0.55 },
];

const HeroBackground = () => {
  return (
    <BackgroundContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {imagesConfig.map((img, index) => (
        <BackgroundImage
          key={index}
          src={img.src}
          alt="" // Декоративные изображения должны иметь пустой alt
          style={{
            top: img.top,
            left: img.left,
            width: img.width,
            minWidth: '200px', // Минимальный размер, чтобы не исчезали на мобилках
            transform: `rotate(${img.rotate}deg)`,
            filter: `blur(${img.blur}px)`,
            opacity: img.opacity,
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export default HeroBackground;