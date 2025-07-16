import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getData, updateData } from '../api/gist';
import toast from 'react-hot-toast';
import axios from 'axios';

const OrderForm = ({ product, onOrderSuccess }) => {
  const [formData, setFormData] = useState({
    fio: '',
    phone: '',
    address: '',
    city: '',
    deliveryMethod: 'pickup',
    shippingService: '',
    communication: 'whatsapp',
    chatLink: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendTelegramNotification = async (order) => { /* ...код без изменений... */ };

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
      const updatedData = { ...currentData, orders: [newOrder, ...(currentData.orders || [])], };
      await updateData(updatedData);
      await sendTelegramNotification(newOrder);
      toast.dismiss(loadingToast);
      onOrderSuccess();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Не удалось оформить заказ. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, product, onOrderSuccess]);

  const mainImage = product.imageUrls?.[0] || product.imageUrl;

  return (
    <FormWrapper>
      <ImagePreview style={{ backgroundImage: `url(${mainImage})` }} />
      <FormContainer onSubmit={handleSubmit}>
        <h3>Оформление заказа</h3>
        <ProductInfo>
          {product.name} — <strong>{product.price} ₽</strong>
        </ProductInfo>
        
        <SectionTitle>Контактная информация</SectionTitle>
        <InputGrid>
            <Input name="fio" placeholder="ФИО" onChange={handleChange} required />
            <Input name="phone" type="tel" placeholder="Номер телефона" onChange={handleChange} required />
        </InputGrid>
        
        <SectionTitle>Способ связи</SectionTitle>
        <Select name="communication" onChange={handleChange} value={formData.communication}>
          <option value="whatsapp">WhatsApp</option>
          <option value="telegram">Telegram</option>
          <option value="vk">ВКонтакте</option>
          <option value="viber">Viber</option>
          <option value="phone_call">Звонок по телефону</option>
        </Select>
        {['telegram', 'vk', 'viber'].includes(formData.communication) && (
            <Input name="chatLink" placeholder="Ссылка на ваш профиль или никнейм" onChange={handleChange} required />
        )}

        <SectionTitle>Доставка</GridTitle>
        <Select name="deliveryMethod" onChange={handleChange} value={formData.deliveryMethod}>
          <option value="pickup">Самовывоз (г. Барнаул, ул. Малахова, 87)</option>
          <option value="delivery">Доставка</option>
        </Select>
        {formData.deliveryMethod === 'delivery' && (
          <>
            <InputGrid>
                <Input name="city" placeholder="Город" onChange={handleChange} required />
                <Select name="shippingService" onChange={handleChange} value={formData.shippingService} required>
                    <option value="" disabled>Служба доставки</option>
                    <option value="yandex">Яндекс Доставка</option>
                    <option value="sdek">СДЭК</option>
                    <option value="russian_post">Почта России</option>
                </Select>
            </InputGrid>
            <Input name="address" placeholder="Адрес (улица, дом, квартира / пункт выдачи)" onChange={handleChange} required />
          </>
        )}
        
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Обработка...' : 'Подтвердить заказ'}
        </SubmitButton>
      </FormContainer>
    </FormWrapper>
  );
};

export default OrderForm;

// --- НОВЫЕ СТИЛИ ---
const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
  height: 100%;
  max-width: 900px;
  max-height: 90vh;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr;
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

const FormContainer = styled.form`
  padding: 2.5rem;
  background-color: var(--bg-dark);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 1.2rem;
  h3 { font-size: 2.4rem; font-family: 'Cormorant Garamond', serif; text-align: center; margin-bottom: 0.5rem; }
`;

const ProductInfo = styled.p`
  text-align: center; margin-bottom: 2rem; color: var(--text-secondary);
`;

const SectionTitle = styled.h4`
  font-size: 1.4rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 0.5rem;
  margin-top: 1rem;
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
`;

const Input = styled.input`
  width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid #444; background: #333; color: var(--text-primary); font-size: 1.6rem;
  &:focus { outline: none; border-color: var(--accent); }
`;

const Select = styled.select`
  width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid #444; background: #333; color: var(--text-primary); font-size: 1.6rem;
  &:focus { outline: none; border-color: var(--accent); }
`;

const SubmitButton = styled.button`
  margin-top: 1.5rem;
  padding: 1.2rem;
  border-radius: 8px;
  border: none;
  background: var(--accent);
  color: var(--bg-dark);
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover { opacity: 0.9; }
  &:disabled { background: #555; cursor: not-allowed; }
`;