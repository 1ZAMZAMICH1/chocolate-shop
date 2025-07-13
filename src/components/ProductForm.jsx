import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProductForm = ({ onSubmit, productToEdit, onCancel }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      setProduct({ name: '', description: '', price: '', imageUrl: '' });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(product);
    setIsSubmitting(false);
    setProduct({ name: '', description: '', price: '', imageUrl: '' });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>{productToEdit ? 'Редактировать товар' : 'Добавить новый товар'}</Title>
      <Input name="name" value={product.name} onChange={handleChange} placeholder="Название товара" required />
      <Textarea name="description" value={product.description} onChange={handleChange} placeholder="Описание" required />
      <Input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Цена (в рублях)" required />
      <Input name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="URL изображения" required />
      <ButtonContainer>
        {onCancel && <CancelButton type="button" onClick={onCancel}>Отмена</CancelButton>}
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Сохранение...' : (productToEdit ? 'Сохранить изменения' : 'Добавить товар')}
        </SubmitButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default ProductForm;

const FormContainer = styled.form`
  padding: 2rem;
  background-color: #111;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid var(--ui-border);
`;

const Title = styled.h3`
  font-family: 'Playfair Display', serif;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
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

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #444;
  background: #222;
  color: var(--text-primary);
  font-size: 1rem;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  border: none;
  background: var(--accent);
  color: var(--bg-dark);
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover { opacity: 0.8; }
  &:disabled { background: #555; cursor: not-allowed; }
`;

const CancelButton = styled(SubmitButton)`
  background: #555;
  color: var(--text-primary);
  &:hover { opacity: 0.8; }
`;