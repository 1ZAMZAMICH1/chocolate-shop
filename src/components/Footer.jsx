import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  position: relative;
  z-index: 10;
  padding: 4rem 5%;
  background-color: #211517;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const FooterText = styled.p`
  color: var(--text-secondary);
  font-size: 1.4rem;
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  font-size: 1.4rem;
  &:hover {
    color: var(--accent);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© {new Date().getFullYear()} ChocoBliss. Все права защищены.</FooterText>
      <FooterNav>
        <FooterLink to="/">Главная</FooterLink>
        <FooterLink to="/shop">Магазин</FooterLink>
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;