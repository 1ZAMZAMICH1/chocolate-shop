import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getData } from '../api/gist';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const FeaturedProducts = ({ onDetailClick, onOrderClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData();
        // Берем 4 товара для главной, чтобы было симметрично
        setProducts((data.products || []).slice(0, 4));
      } catch (err) {
        console.error("Failed to load featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <SectionContainer>
      <SectionTitle>Наши бестселлеры</SectionTitle>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetailClick={onDetailClick} // ПЕРЕДАЕМ КЛИК ДАЛЬШЕ
            onOrderClick={onOrderClick}   // ПЕРЕДАЕМ КЛИК ДАЛЬШЕ
          />
        ))}
      </ProductsGrid>
    </SectionContainer>
  );
};

export default FeaturedProducts;

const SectionContainer = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 4.2rem;
  text-align: center;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  width: 100%;
`;