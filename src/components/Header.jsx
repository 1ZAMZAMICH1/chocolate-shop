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
      <ScaleWrapper>
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
      </ScaleWrapper>
    </HeaderWrapper>
  );
};

export default Header;

// ========== СТИЛИ ==========

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  height: auto;
  overflow: visible;
`;

const ScaleWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: auto;

  & > div {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scale(1);

    @media (max-width: 1300px) {
      transform: translateX(-50%) scale(0.85);
    }

    @media (max-width: 768px) {
      transform: translateX(-50%) scale(0.72);
    }

    @media (max-width: 480px) {
      transform: translateX(-50%) scale(0.6);
    }

    transform-origin: top center;
  }
`;

const NavbarContainer = styled(motion.nav)`
  width: 1300px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.5rem 4rem;
  background: linear-gradient(145deg, #3a221d, #211517);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.1);

  clip-path: path(
    'M0,30 Q50,0 100,20 L900,20 Q950,25 1000,0 L1200,15 Q1250,20 1300,5 L1300,80 Q1250,100 1200,85 L1000,90 Q950,85 900,100 L100,90 Q50,95 0,70 Z'
  );
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
`;

const LogoContainer = styled(NavLink)`
  padding: 0 4rem;
  height: 50px;
  display: flex;
  align-items: center;

  img {
    height: 100%;
    width: auto;
    display: block;
  }
`;
