import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getData, updateData } from '../api/gist';
import toast from 'react-hot-toast';

const OrderForm = ({ product, onOrderSuccess }) => {
  const [formData, setFormData] = useState({
    fio: '',
    phone: '',
    address: '',
    city: '',
    delivery: 'pickup',
    communication: 'whatsapp',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading('Оформляем ваш заказ...');

    try {
      const currentData = await getData();
      const newOrder = {
        id: `order${Date.now()}`,
        date: new Date().toISOString(),
        productName: product.name,
        price: product.price,
        status: 'new',
        customer: { ...formData },
      };

      const updatedData = {
        ...currentData,
        orders: [newOrder, ...(currentData.orders || [])],
      };

      await updateData(updatedData);
      toast.dismiss(loadingToast);
      onOrderSuccess();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Не удалось оформить заказ. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, product, onOrderSuccess]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>Оформление заказа</h3>
      <ProductInfo>
        Вы заказываете: <strong>{product.name}</strong> ({product.price} ₽)
      </ProductInfo>
      <Input name="fio" placeholder="ФИО" onChange={handleChange} required />
      <Input name="phone" type="tel" placeholder="Номер телефона" onChange={handleChange} required />
      <Input name="city" placeholder="Город" onChange={handleChange} required />
      <Input name="address" placeholder="Адрес (улица, дом, квартира)" onChange={handleChange} required />
      <Select name="delivery" onChange={handleChange} value={formData.delivery}>
        <option value="pickup">Самовывоз</option>
        <option value="delivery">Доставка</option>
      </Select>
      <Select name="communication" onChange={handleChange} value={formData.communication}>
        <option value="whatsapp">Связаться в WhatsApp</option>
        <option value="telegram">Связаться в Telegram</option>
        <option value="phone_call">Позвонить</option>
      </Select>
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Обработка...' : 'Заказать'}
      </SubmitButton>
    </FormContainer>
  );
};

export default OrderForm;

// Стили...
const FormContainer = styled.form` max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; h3 { font-size: 2rem; text-align: center; margin-bottom: 1rem; } `;
const ProductInfo = styled.p` text-align: center; margin-bottom: 1.5rem; color: var(--text-secondary); `;
const Input = styled.input` width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid #444; background: #222; color: var(--text-primary); font-size: 1.6rem; &:focus { outline: none; border-color: var(--accent); } `;
const Select = styled.select` width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid #444; background: #222; color: var(--text-primary); font-size: 1.6rem; &:focus { outline: none; border-color: var(--accent); } `;
const SubmitButton = styled.button` padding: 1rem; border-radius: 8px; border: none; background: var(--accent); color: var(--bg-dark); font-size: 1.6rem; font-weight: 700; cursor: pointer; transition: opacity 0.3s ease; &:hover { opacity: 0.9; } &:disabled { background: #555; cursor: not-allowed; } `;