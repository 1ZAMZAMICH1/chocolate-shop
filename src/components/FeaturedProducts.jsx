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
            onDetailClick={onDetailClick}
            onOrderClick={onOrderClick}
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

  @media (max-width: 900px) {
    padding: 4rem 1rem;
    gap: 3rem;
  }
  @media (max-width: 600px) {
    padding: 2.5rem 0.5rem;
    gap: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 4.2rem;
  text-align: center;

  @media (max-width: 900px) {
    font-size: 3rem;
  }
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  width: 100%;

  @media (max-width: 900px) {
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;
