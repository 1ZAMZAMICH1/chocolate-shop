import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { getData } from '../api/gist';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData();
        setProducts(data.products ? data.products.slice(0, 4) : []);
      } catch (err) {
        console.error("Failed to load featured products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <Section><Title>Загрузка...</Title></Section>;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <Section>
      <Title>Популярные товары</Title>
      <ProductsGrid>
        <AnimatePresence>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOrderClick={() => {}} 
            />
          ))}
        </AnimatePresence>
      </ProductsGrid>
      <ViewAllLink to="/shop">Смотреть все товары</ViewAllLink>
    </Section>
  );
};

export default FeaturedProducts;

const Section = styled.section`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 5rem 0;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  text-align: center;
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 3rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
`;

const ViewAllLink = styled(Link)`
  display: block;
  width: fit-content;
  margin: 3rem auto 0;
  padding: 0.8rem 2rem;
  border: 1px solid var(--text-secondary);
  color: var(--text-secondary);
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--accent);
    color: var(--bg-dark);
    border-color: var(--accent);
  }
`;