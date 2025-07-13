import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>ChocoBliss</FooterTitle>
          <p>Премиальный шоколад ручной работы. Сделано с любовью в России.</p>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Навигация</FooterTitle>
          <FooterLink to="/">Главная</FooterLink>
          <FooterLink to="/shop">Магазин</FooterLink>
          <FooterLink to="/#reviews">Отзывы</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Информация</FooterTitle>
          <FooterLink to="/delivery">Доставка и оплата</FooterLink>
          <FooterLink to="/contacts">Контакты</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterTitle>Подписывайтесь</FooterTitle>
          <SocialLinks>
            <a href="#" target="_blank" rel="noopener noreferrer">IG</a>
            <a href="#" target="_blank" rel="noopener noreferrer">TG</a>
            <a href="#" target="_blank" rel="noopener noreferrer">VK</a>
          </SocialLinks>
        </FooterColumn>
      </FooterContent>
      <FooterBottom>
        <p>© {new Date().getFullYear()} ChocoBliss. Все права защищены.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #0d0406;
  color: var(--text-secondary);
  padding: 4rem 5% 2rem;
  margin-top: 5rem;
  border-top: 1px solid var(--ui-border);
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  color: var(--text-primary);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: var(--accent);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 700;
    transition: color 0.3s ease;
    &:hover {
      color: var(--accent);
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--ui-border);
  font-size: 0.9rem;
`;