import React from 'react';
import styled, { keyframes } from 'styled-components';

const fallAnimation = keyframes`
  0% {
    transform: translateY(-30vh) rotate(-20deg);
  }
  100% {
    transform: translateY(110vh) rotate(360deg);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;

  /* Создаем 7 невидимых "коридоров" для падения */
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Lane = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const FallingItem = styled.img`
  width: ${props => props.width};
  opacity: 0.3;
  filter: blur(2px);
  animation: ${fallAnimation} linear infinite;
  animation-duration: ${props => props.duration};
  animation-delay: ${props => props.delay};
  align-self: flex-start; /* Начинаем анимацию с верха "коридора" */
`;

const itemsConfig = [
  // Атрибуты: s-ссылка, w-ширина, d-длительность, del-задержка
  { s: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752398527/6521111_xzwrpp.png", w: '12vw', d: '12s', del: '0s' },
  { s: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752398525/7665321_mb3qow.png", w: '8vw', d: '9s', del: '-5s' },
  { s: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752398517/1233311_q5ij7p.png", w: '15vw', d: '14s', del: '-10s' },
  { s: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752398523/5632_tgnnxk.png", w: '14vw', d: '12s', del: '-2s' },
  { s: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752398518/76752_wa9iv7.png", w: '10vw', d: '16s', del: '-12s' },
  { s: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752398525/54311%D1%91%D1%91%D1%91_agrajw.png", w: '16vw', d: '11s', del: '-7s' },
  { s: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1752398527/6521111_xzwrpp.png", w: '13vw', d: '17s', del: '-3s' },
];

const FallingBackground = () => {
  return (
    <BackgroundContainer>
      {itemsConfig.map((item, index) => (
        <Lane key={index}>
          <FallingItem
            src={item.s}
            width={item.w}
            duration={item.d}
            delay={item.del}
          />
        </Lane>
      ))}
    </BackgroundContainer>
  );
};

export default FallingBackground;