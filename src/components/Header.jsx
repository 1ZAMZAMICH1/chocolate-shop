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
      <ClipPathDefs />
      <NavbarContainer
        initial={{ y: -200, rotate: -5, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 15, duration: 1.5, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
      >
        <NavSection>
          {navItemsLeft.map(item => (
            <StyledNavLink key={item.path} to={item.path}>
              {item.label}
            </StyledNavLink>
          ))}
        </NavSection>

        <LogoContainer to="/">
          <img
            src="https://res.cloudinary.com/dyuywnfy3/image/upload/v1752414922/2321_xmt9fg.png"
            alt="ChocoPrima Logo"
          />
        </LogoContainer>

        <NavSection>
          {navItemsRight.map(item => (
            <StyledNavLink key={item.path} to={item.path}>
              {item.label}
            </StyledNavLink>
          ))}
        </NavSection>
      </NavbarContainer>
    </HeaderWrapper>
  );
};

export default Header;

// ========== СТИЛИ ==========

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 1rem;
  z-index: 1000;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;

// 👇 создаём SVG clipPath, который адаптивно растягивается
const ClipPathDefs = () => (
  <svg width="0" height="0">
    <defs>
      <clipPath id="header-clip" clipPathUnits="objectBoundingBox">
        <path
          d="M0,0.3 Q0.038,0 0.077,0.15 L0.69,0.15 Q0.731,0.187 0.769,0 L0.923,0.112 Q0.962,0.15 1,0.037 L1,0.615 Q0.962,0.769 0.923,0.654 L0.769,0.692 Q0.731,0.654 0.69,0.769 L0.077,0.692 Q0.038,0.731 0,0.538 Z"
          transform="scale(1, 1)"
        />
      </clipPath>
    </defs>
  </svg>
);

const NavbarContainer = styled(motion.nav)`
  width: 100%;
  max-width: 1300px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  padding: 1.7rem 4rem;

  background: linear-gradient(145deg, #3a221d, #211517);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.1);

  /* ✅ теперь clip-path растягивается с шириной */
  clip-path: url(#header-clip);

  @media (max-width: 768px) {
    padding: 1.6rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.2rem;
  }
`;

const NavSection = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;

  &:first-child {
    justify-content: flex-start;
  }

  &:last-child {
    justify-content: flex-end;
  }

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: var(--text-primary);
    transform: translateY(-2px);
  }

  &.active {
    color: var(--accent);
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const LogoContainer = styled(NavLink)`
  padding: 0 4rem;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100%;
    width: auto;
    display: block;
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 1.5rem;
    height: 45px;

    img {
      max-height: 45px;
    }
  }
`;
