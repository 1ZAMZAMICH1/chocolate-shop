import React from 'react';
import styled from 'styled-components';
import ContactSection from '../components/ContactSection';

const PageContainer = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 0 50px;
`;

const Title = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  text-align: center;
  font-size: 3rem;
  color: var(--accent);
  margin-bottom: 3rem;
`;

const ContactsPage = () => {
  return (
    <PageContainer>
      <Title>Наши контакты</Title>
      {/* ContactSection уже содержит всю нужную информацию */}
      <ContactSection />
    </PageContainer>
  );
};

export default ContactsPage;