import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getData, updateData } from '../api/gist';
import toast from 'react-hot-toast';
import axios from 'axios'; // Убедись, что axios импортирован

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

  // --- НОВАЯ ФУНКЦИЯ ДЛЯ ОТПРАВКИ В ТЕЛЕГРАМ ---
  const sendTelegramNotification = async (order) => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.warn("Переменные для Telegram не заданы. Уведомление не будет отправлено.");
      return; // Тихо выходим, если токена или ID чата нет
    }

    // Формируем красивое сообщение
    let message = `<b>🔥 Новый заказ!</b>\n\n`;
    message += `<b>Товар:</b> ${order.productName}\n`;
    message += `<b>Цена:</b> ${order.price} ₽\n\n`;
    message += `<b><u>Данные клиента:</u></b>\n`;
    message += `<b>ФИО:</b> ${order.customer.fio}\n`;
    message += `<b>Телефон:</b> <code>${order.customer.phone}</code>\n`;
    message += `<b>Адрес:</b> ${order.customer.city}, ${order.customer.address}\n`;
    message += `<b>Доставка:</b> ${order.customer.delivery}\n`;
    message += `<b>Способ связи:</b> ${order.customer.communication}\n`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML', // Включаем HTML-разметку для жирного текста и т.д.
      });
    } catch (error) {
      console.error("Ошибка при отправке уведомления в Telegram:", error);
      // Не показываем ошибку пользователю, это внутренняя проблема
    }
  };
  // --- КОНЕЦ НОВОЙ ФУНКЦИИ ---

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

      // --- ВЫЗЫВАЕМ ОТПРАВКУ В ТЕЛЕГРАМ ПОСЛЕ СОХРАНЕНИЯ ---
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

  return (
    // ... JSX формы остается без изменений ...
    <FormContainer onSubmit={handleSubmit}>
      <h3>Оформление заказа</h3>
      <ProductInfo>
        Вы заказываете: <strong>{product.name}</strong> ({product.price} ₽)
      </ProductInfo>
      <Input name="fio" placeholder="ФИО" onChange={(e) => setFormData({...formData, fio: e.target.value})} required />
      <Input name="phone" type="tel" placeholder="Номер телефона" onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
      <Input name="city" placeholder="Город" onChange={(e) => setFormData({...formData, city: e.target.value})} required />
      <Input name="address" placeholder="Адрес (улица, дом, квартира)" onChange={(e) => setFormData({...formData, address: e.target.value})} required />
      <Select name="delivery" onChange={(e) => setFormData({...formData, delivery: e.target.value})} value={formData.delivery}>
        <option value="pickup">Самовывоз</option>
        <option value="delivery">Доставка</option>
      </Select>
      <Select name="communication" onChange={(e) => setFormData({...formData, communication: e.target.value})} value={formData.communication}>
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
const FormContainer = styled.form` /* ... */ `;
const ProductInfo = styled.p` /* ... */ `;
const Input = styled.input` /* ... */ `;
const Select = styled.select` /* ... */ `;
const SubmitButton = styled.button` /* ... */ `;