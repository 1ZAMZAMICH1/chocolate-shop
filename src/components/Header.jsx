import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <HeaderContainer
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Logo>ChocoBliss</Logo>
      <Nav>
        <StyledNavLink to="/">Главная</StyledNavLink>
        <StyledNavLink to="/shop">Магазин</StyledNavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default React.memo(Header);

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: rgba(26, 9, 13, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
`;

const Logo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent);
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: var(--accent);
    bottom: -5px;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: var(--accent);
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  &.active {
    color: var(--accent);
    &::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`;