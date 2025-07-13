import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <SectionContainer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      <InfoWrapper>
        <h2>Свяжитесь с нами</h2>
        <p>Мы всегда рады ответить на ваши вопросы и помочь с выбором идеального подарка.</p>
        <PhoneNumber href="tel:+79963007514">
          📞 +7 (996) 300-75-14
        </PhoneNumber>
        <Address>
          г. Барнаул, ул. Малахова, 87
        </Address>
      </InfoWrapper>
      <MapWrapper>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A90ce842497a69fb12d87a7d727b122bf5d9e47110c4f702bd8e124891bfd8857&source=constructor"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Карта"
        ></iframe>
      </MapWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled(motion.section)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  gap: 5rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const InfoWrapper = styled.div`
  @media (max-width: 900px) {
    text-align: center;
  }
  h2 { font-family: var(--font-heading); font-size: 4.2rem; color: var(--text-primary); margin-bottom: 2rem; }
  p { font-size: 1.8rem; color: var(--text-secondary); margin-bottom: 3rem; }
`;

const PhoneNumber = styled.a`
  display: block; font-size: 2.4rem; font-weight: 600; color: var(--accent); margin-bottom: 1.5rem; text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const Address = styled.p`
  font-size: 1.6rem;
  color: var(--text-secondary);
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  iframe {
    /* Фильтр убран */
  }
`;

export default ContactSection;