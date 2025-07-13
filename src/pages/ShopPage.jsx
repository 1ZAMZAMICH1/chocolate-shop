import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { getData } from '../api/gist';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import OrderForm from '../components/OrderForm';
import ProductDetailModal from '../components/ProductDetailModal';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData();
        setProducts(data.products || []);
      } catch (err) {
        setError('Не удалось загрузить товары. Загляните позже!');
        toast.error('Ошибка загрузки товаров!');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleQuickOrderClick = useCallback((product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(false);
    setIsOrderModalOpen(true);
  }, []);

  const handleDetailClick = useCallback((product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  }, []);

  const handleCloseModals = useCallback(() => {
    setIsOrderModalOpen(false);
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleOrderSuccess = useCallback(() => {
    toast.success('Спасибо за заказ! Мы скоро свяжемся с вами.');
    handleCloseModals();
  }, [handleCloseModals]);

  if (isLoading) return <LoadingSpinner />;
  if (error && products.length === 0) return <MessageContainer>{error}</MessageContainer>;

  return (
    <PageContainer>
      <Title>Наш Ассортимент</Title>
      <ProductsGrid>
        <AnimatePresence>
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onOrderClick={handleQuickOrderClick}
                onDetailClick={handleDetailClick}
              />
            ))
          ) : (
            <MessageContainer>Пока что здесь пусто...</MessageContainer>
          )}
        </AnimatePresence>
      </ProductsGrid>
      
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        onOrder={handleQuickOrderClick}
      />
      
      <Modal isOpen={isOrderModalOpen} onClose={handleCloseModals}>
        {selectedProduct && <OrderForm product={selectedProduct} onOrderSuccess={handleOrderSuccess} />}
      </Modal>
    </PageContainer>
  );
};

export default ShopPage;

const PageContainer = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 0 50px;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  text-align: center;
  font-size: 3rem;
  color: var(--accent);
  margin-bottom: 3rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
`;

const MessageContainer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: var(--text-secondary);
  padding: 5rem 0;
  grid-column: 1 / -1;
`;