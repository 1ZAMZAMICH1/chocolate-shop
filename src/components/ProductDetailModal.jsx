import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetailModal = ({ product, isOpen, onClose, onOrder }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ImageColumn style={{ backgroundImage: `url(${product.imageUrl})` }} />
            <ContentColumn>
              <CloseButton onClick={onClose}>×</CloseButton>
              <Title>{product.name}</Title>
              <Description>{product.description}</Description>
              <Footer>
                <Price>{product.price} ₽</Price>
                <OrderButton onClick={() => onOrder(product)}>Заказать сейчас</OrderButton>
              </Footer>
            </ContentColumn>
          </ModalContainer>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

const ModalContainer = styled(motion.div)`
  width: 90%;
  max-width: 900px;
  height: 80vh;
  max-height: 600px;
  background: var(--bg-dark);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  border: 1px solid var(--ui-border);
  @media (max-width: 768px) {
    flex-direction: column;
    height: 90vh;
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  background-size: cover;
  background-position: center;
`;

const ContentColumn = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 2.5rem;
  cursor: pointer;
  line-height: 1;
  z-index: 10;
  &:hover {
    color: var(--text-primary);
  }
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: var(--text-primary);
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  flex-grow: 1;
  margin-bottom: 2rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Price = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent);
  font-family: 'Playfair Display', serif;
`;

const OrderButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 5px;
  border: none;
  background: var(--accent);
  color: var(--bg-dark);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;