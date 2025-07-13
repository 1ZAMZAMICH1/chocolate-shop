// Полностью замени содержимое этого файла
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaVk, FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn className="logo-col">
          <LogoLink to="/">
            <img src="https://res.cloudinary.com/dyuywnfy3/image/upload/v1752414922/2321_xmt9fg.png" alt="ChocoPrima Logo" />
          </LogoLink>
          <p>Искусство, которое можно попробовать. Шоколадные букеты и фигуры ручной работы.</p>
        </FooterColumn>
        <FooterColumn className="nav-col">
          <h4>Навигация</h4>
          <FooterLink to="/">Главная</FooterLink>
          <FooterLink to="/shop">Магазин</FooterLink>
          <FooterLink to="/#reviews">Отзывы</FooterLink>
        </FooterColumn>
        <FooterColumn className="contact-col">
          <h4>Связь с нами</h4>
          <PhoneNumber href="tel:+79963007514">+7 (996) 300-75-14</PhoneNumber>
          <SocialLinks>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaVk /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaTelegramPlane /></a>
            <a href="https://wa.me/79963007514" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </SocialLinks>
        </FooterColumn>
      </FooterContent>
      <FooterBottom>
        <p>© {new Date().getFullYear()} ChocoPrima. Все права защищены.</p>
        <AdminLink to="/admin">Панель управления</AdminLink>
        <AuthorAttribution href="https://zamzamich.netlify.app/" target="_blank" rel="noopener noreferrer">
          <span>Разработано и создано</span>
          <img src="https://res.cloudinary.com/dyuywnfy3/image/upload/v1752427389/9076532_qvzthr.png" alt="ZAMZAMICH" />
        </AuthorAttribution>
      </FooterBottom>
    </FooterContainer>
  );
};
export default Footer;
// ...СТИЛИ...
const LogoLink = styled(NavLink)` display: block; width: 180px; margin-bottom: 1.5rem; img { width: 100%; height: auto; } `;
// Остальные стили те же
const FooterContainer = styled.footer` background-color: #1a100f; color: var(--text-secondary); padding: 4rem 5% 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1); `;
const FooterContent = styled.div` display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; @media (max-width: 768px) { grid-template-columns: 1fr; } `;
const FooterColumn = styled.div` h4 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: var(--text-primary); margin-bottom: 1.5rem; } p { line-height: 1.7; max-width: 35ch; } `;
const PhoneNumber = styled.a` color: var(--text-primary); font-weight: 600; text-decoration: none; &:hover { color: var(--accent); } `;
const FooterLink = styled(NavLink)` display: block; margin-bottom: 0.8rem; color: var(--text-secondary); text-decoration: none; &:hover { color: var(--accent); } `;
const SocialLinks = styled.div` display: flex; gap: 1.5rem; margin-top: 1rem; a { color: var(--text-secondary); font-size: 1.8rem; transition: color 0.3s, transform 0.3s; &:hover { color: var(--accent); transform: translateY(-3px); } } `;
const FooterBottom = styled.div` border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; font-size: 1.4rem; flex-wrap: wrap; gap: 1rem; `;
const AuthorAttribution = styled.a` display: flex; align-items: center; gap: 1rem; color: var(--text-secondary); text-decoration: none; opacity: 0.7; transition: opacity 0.3s; &:hover { opacity: 1; } img { height: 25px; width: auto; } span { white-space: nowrap; } `;
const AdminLink = styled(NavLink)` color: #555; text-decoration: none; &:hover { color: var(--accent); } `;