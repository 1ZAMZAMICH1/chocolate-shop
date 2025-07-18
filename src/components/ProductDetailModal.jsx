import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductDetailModal = ({ product, isOpen, onClose, onOrder }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Используем imageUrls, если он есть, иначе старый imageUrl
  const images = product?.imageUrls?.length ? product.imageUrls : [product?.imageUrl];

  // Сбрасываем индекс при открытии новой модалки
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, product]);
  
  // Ничего не рендерим, если модалка закрыта или нет продукта
  if (!isOpen || !product) {
    return null;
  }

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <Backdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContainer
        initial={{ y: "10vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "10vh", opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ImageColumn>
          <AnimatePresence mode="wait">
            <Image
              key={currentIndex}
              src={images[currentIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
          {images.length > 1 && (
            <>
              <NavButton className="left" onClick={handlePrev}><FaChevronLeft /></NavButton>
              <NavButton className="right" onClick={handleNext}><FaChevronRight /></NavButton>
              <Dots>
                {images.map((_, i) => <Dot key={i} $active={i === currentIndex} onClick={() => setCurrentIndex(i)} />)}
              </Dots>
            </>
          )}
        </ImageColumn>
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
  );
};

export default ProductDetailModal;

// --- СТИЛИ С ИСПРАВЛЕНИЯМИ ---

const Backdrop = styled(motion.div)` position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 3000; `;
const ModalContainer = styled(motion.div)` width: 90%; max-width: 900px; height: 80vh; max-height: 600px; background: var(--bg-dark); border-radius: 15px; overflow: hidden; display: flex; border: 1px solid var(--ui-border); @media (max-width: 768px) { flex-direction: column; height: 90vh; } `;
const ImageColumn = styled.div` flex: 1; position: relative; background-color: #111; display: flex; justify-content: center; align-items: center; padding: 1rem; `;
const ContentColumn = styled.div` flex: 1; padding: 3rem; display: flex; flex-direction: column; position: relative; overflow-y: auto; @media (max-width: 768px) { padding: 2rem; } `;
const CloseButton = styled.button` position: absolute; top: 20px; right: 20px; background: none; border: none; color: var(--text-secondary); font-size: 2.5rem; cursor: pointer; line-height: 1; z-index: 10; &:hover { color: var(--text-primary); } `;
const Title = styled.h2` font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 2.5rem); color: var(--text-primary); margin-bottom: 1.5rem; `;
const Footer = styled.div` display: flex; justify-content: space-between; align-items: center; margin-top: auto; gap: 1.5rem; flex-wrap: wrap; `;
const Price = styled.span` font-size: 2.5rem; font-weight: 700; color: var(--accent); font-family: 'Playfair Display', serif; `;
const OrderButton = styled.button` padding: 1rem 2rem; border-radius: 5px; border: none; background: var(--accent); color: var(--bg-dark); font-size: 1rem; font-weight: 700; cursor: pointer; text-transform: uppercase; transition: transform 0.2s ease; &:hover { transform: scale(1.05); } `;
const NavButton = styled.button` position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.4); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: background-color 0.2s; z-index: 5; &.left { left: 10px; } &.right { right: 10px; } &:hover { background: rgba(0,0,0,0.7); } `;
const Dots = styled.div` position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 5;`;
const Dot = styled.div` width: 10px; height: 10px; border-radius: 50%; background: ${props => props.$active ? 'var(--accent)' : 'rgba(255,255,255,0.5)'}; cursor: pointer; transition: background-color 0.2s; `;

// ИСПРАВЛЕННЫЕ СТИЛИ
const Image = styled(motion.img)`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* ВОТ ИСПРАВЛЕНИЕ №1: Сохраняет пропорции */
`;

const Description = styled.p`
  font-size: 1.6rem; /* ВОТ ИСПРАВЛЕНИЕ №2: Увеличил размер текста */
  line-height: 1.7;
  color: var(--text-secondary);
  flex-grow: 1;
  margin-bottom: 2rem;
  white-space: pre-wrap;
`;