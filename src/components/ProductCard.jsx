import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProductCard = React.memo(({ product, onOrderClick, onDetailClick }) => {
  const { name, description, price, imageUrl } = product;

  const handleOrder = (e) => {
    e.stopPropagation();
    onOrderClick(product);
  };
  
  const handleDetails = () => {
    onDetailClick(product);
  };

  return (
    <CardContainer
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      onClick={handleDetails}
    >
      <ImageContainer>
        <img src={imageUrl} alt={name} loading="lazy" />
      </ImageContainer>
      <Content>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <Footer>
          <Price>{price} ₽</Price>
          <OrderButton onClick={handleOrder}>
            Купить
          </OrderButton>
        </Footer>
      </Content>
    </CardContainer>
  );
});

export default ProductCard;

const CardContainer = styled(motion.div)`
  background: var(--ui-background);
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 75%;
  position: relative;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const Description = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const Price = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent);
`;

const OrderButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  z-index: 2;

  &:hover {
    background: var(--accent);
    color: var(--bg-dark);
  }
`;