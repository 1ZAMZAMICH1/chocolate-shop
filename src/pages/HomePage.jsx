import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import ReviewsSection from '../components/ReviewsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import ProductDetailModal from '../components/ProductDetailModal';
import Modal from '../components/Modal';
import OrderForm from '../components/OrderForm';

const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleDetailClick = useCallback((product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  }, []);

  const handleQuickOrderClick = useCallback((product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(false);
    setIsOrderModalOpen(true);
  }, []);
  
  const handleCloseModals = useCallback(() => {
    setIsDetailModalOpen(false);
    setIsOrderModalOpen(false);
    setSelectedProduct(null);
  }, []);
  
  const handleOrderSuccess = useCallback(() => {
    toast.success('Спасибо за заказ! Мы скоро свяжемся с вами.');
    handleCloseModals();
  }, [handleCloseModals]);

  return (
    <>
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        onOrder={handleQuickOrderClick}
      />
      <Modal isOpen={isOrderModalOpen} onClose={handleCloseModals}>
        {selectedProduct && <OrderForm product={selectedProduct} onOrderSuccess={handleOrderSuccess} />}
      </Modal>

      <HeroSection />
      
      <SectionWrapper>
        <AboutSection />
      </SectionWrapper>
      
      <SectionWrapper hasBackground>
        {/* ВОТ ИСПРАВЛЕНИЕ. ДОБАВЛЯЕМ ПРОПСЫ. */}
        <FeaturedProducts onDetailClick={handleDetailClick} onOrderClick={handleQuickOrderClick} />
      </SectionWrapper>

      <SectionWrapper>
        <ContactSection />
      </SectionWrapper>
      
      <SectionWrapper hasBackground>
        <ReviewsAnchor id="reviews">
          <ReviewsSection />
        </ReviewsAnchor>
      </SectionWrapper>
    </>
  );
};

export default HomePage;

const SectionWrapper = styled.div`
  padding: 3rem 0;
  background: ${({ hasBackground }) => hasBackground ? 'rgba(0,0,0,0.15)' : 'transparent'};
`;

const ReviewsAnchor = styled.div`
  scroll-margin-top: 100px;
`;