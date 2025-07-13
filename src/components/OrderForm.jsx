import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getData, updateData } from '../api/gist';

const OrderForm = ({ product, onOrderSuccess }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!name || !contact) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      const currentData = await getData();
      const newOrder = {
        id: `order${Date.now()}`,
        customerName: name,
        customerContact: contact,
        productId: product.id,
        productName: product.name,
        price: product.price,
        date: new Date().toISOString(),
        status: 'new',
      };

      const updatedData = {
        ...currentData,
        orders: [newOrder, ...currentData.orders],
      };

      await updateData(updatedData);
      onOrderSuccess();

    } catch (err) {
      setError('Не удалось оформить заказ. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  }, [name, contact, product, onOrderSuccess]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Оформление заказа</Title>
      <ProductInfo>
        Вы заказываете: <strong>{product.name}</strong> за <strong>{product.price} ₽</strong>
      </ProductInfo>
      <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input placeholder="Email или телефон для связи" value={contact} onChange={(e) => setContact(e.target.value)} required />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Оформляем...' : 'Заказать'}
      </SubmitButton>
    </FormContainer>
  );
};

export default OrderForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  text-align: center;
  margin-bottom: 1rem;
`;

const ProductInfo = styled.p`
  text-align: center;
  background: var(--ui-background);
  padding: 0.8rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #444;
  background: #222;
  color: var(--text-primary);
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  border-radius: 5px;
  border: none;
  background: var(--accent);
  color: var(--bg-dark);
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
`;