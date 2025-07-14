import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <SectionContainer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      <TextPart>
        Я, Юлия Лотухова, — основатель и идейный вдохновитель Chocoprima. Моя страсть к искусству и любовь к шоколаду стали фундаментом для создания уникальных флористических композиций.
      </TextPart>
      <ImageWrapper>
        <img src="https://res.cloudinary.com/dyuywnfy3/image/upload/v1752412816/8098900_v3oglo.png" alt="Юлия Лотухова, основатель Chocoprima" />
      </ImageWrapper>
      <TextPart align="left">
        Chocoprima — это не просто мастерская, это место, где искусство встречается с кондитерским мастерством. Я верю, что красота может быть съедобной, и каждый наш букет — это доказательство этой философии.
      </TextPart>
    </SectionContainer>
  );
};

const SectionContainer = styled(motion.section)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 4rem;

  @media (max-width: 900px) {
    padding: 4rem 1rem;
    gap: 2rem;
    max-width: 100vw;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 2.5rem 0.5rem;
    gap: 1.5rem;
    justify-items: center;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 10px rgba(255,255,255,0.05), 0 10px 40px rgba(0,0,0,0.5);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 900px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: 600px) {
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }
`;

const TextPart = styled.p`
  font-size: 1.8rem;
  line-height: 1.8;
  color: var(--text-secondary);
  text-align: ${props => props.align || 'right'};
  max-width: 40ch;
  justify-self: ${props => (props.align === 'left' ? 'start' : 'end')};

  @media (max-width: 900px) {
    font-size: 1.3rem;
    max-width: 32ch;
  }

  @media (max-width: 600px) {
    font-size: 1.07rem;
    line-height: 1.5;
    max-width: 95vw;
    text-align: center;
    justify-self: center;
  }
`;

export default AboutSection;
