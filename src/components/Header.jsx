import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItemsLeft = [
  { path: '/', label: 'Главная' },
  { path: '/shop', label: 'Магазин' },
];

const navItemsRight = [
  { path: '/contacts', label: 'Контакты' },
  { path: '/reviews', label: 'Отзывы' },
];

const Header = () => {
  return (
    <HeaderWrapper>
      <NavbarContainer
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 15, duration: 1.5, delay: 0.2 }}
      >
        <LogoContainer to="/">
          <img src="https://res.cloudinary.com/dyuywnfy3/image/upload/v1752414922/2321_xmt9fg.png" alt="ChocoPrima Logo" />
        </LogoContainer>
        
        <DesktopNav>
            <NavSection>
              {navItemsLeft.map(item => ( <StyledNavLink key={item.path} to={item.path}>{item.label}</StyledNavLink> ))}
            </NavSection>
            <NavSection>
              {navItemsRight.map(item => ( <StyledNavLink key={item.path} to={item.path}>{item.label}</StyledNavLink> ))}
            </NavSection>
        </DesktopNav>

        <MobileNav>
            {navItemsLeft.map(item => ( <StyledNavLink key={item.path} to={item.path}>{item.label}</StyledNavLink> ))}
            {navItemsRight.map(item => ( <StyledNavLink key={item.path} to={item.path}>{item.label}</StyledNavLink> ))}
        </MobileNav>

      </NavbarContainer>
    </HeaderWrapper>
  );
};

export default Header;

// --- СТИЛИ, КОТОРЫЕ РАБОТАЮТ ---

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  z-index: 1000;
  display: flex;
  justify-content: center;
`;

const NavbarContainer = styled(motion.nav)`
  width: 100%;
  max-width: 1300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  
  background: linear-gradient(145deg, #3a221d, #211517);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  border-radius: 20px;

  /* На мобилке перестраиваем все в колонку */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const LogoContainer = styled(NavLink)`
  height: 40px;
  display: flex;
  align-items: center;

  img { height: 100%; width: auto; }

  @media (max-width: 768px) {
    height: 35px;
  }
`;

// Навигация для десктопа
const DesktopNav = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  padding: 0 3rem;

  @media (max-width: 768px) {
    display: none; /* Скрываем на мобилке */
  }
`;

const NavSection = styled.div`
  display: flex;
  gap: 3rem;
`;

// Навигация для мобилки
const MobileNav = styled.div`
  display: none; /* Скрываем на десктопе */

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap; /* Позволяем переноситься на новую строку */
    justify-content: center;
    gap: 1.5rem 2rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.3s ease;
  
  &:hover, &.active {
    color: var(--accent);
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;