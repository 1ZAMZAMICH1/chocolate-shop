// Полностью замени содержимое этого файла
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProductForm = ({ onSubmit, productToEdit, onCancel }) => {
  const [product, setProduct] = useState({ name: '', price: '', description: '', imageUrls: [''] });

  useEffect(() => {
    if (productToEdit) {
      setProduct({
        ...productToEdit,
        imageUrls: productToEdit.imageUrls?.length ? productToEdit.imageUrls : [productToEdit.imageUrl || ''],
      });
    } else {
      setProduct({ name: '', price: '', description: '', imageUrls: [''] });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...product.imageUrls];
    newImageUrls[index] = value;
    setProduct(prev => ({ ...prev, imageUrls: newImageUrls }));
  };

  const addImageUrlField = () => {
    setProduct(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ''] }));
  };

  const removeImageUrlField = (index) => {
    const newImageUrls = product.imageUrls.filter((_, i) => i !== index);
    setProduct(prev => ({ ...prev, imageUrls: newImageUrls }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalProduct = {
      ...product,
      imageUrls: product.imageUrls.filter(url => url.trim() !== ''),
      imageUrl: product.imageUrls.filter(url => url.trim() !== '')[0] || '', // Для совместимости
    };
    onSubmit(finalProduct);
    setProduct({ name: '', price: '', description: '', imageUrls: [''] });
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <h3>{productToEdit ? 'Редактировать товар' : 'Добавить новый товар'}</h3>
      <InputGrid>
        <Input name="name" value={product.name} onChange={handleChange} placeholder="Название товара" required />
        <Input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Цена" required />
      </InputGrid>
      <Textarea name="description" value={product.description} onChange={handleChange} placeholder="Описание" required />
      
      <ImageUrlsSection>
        <label>Ссылки на изображения:</label>
        {product.imageUrls.map((url, index) => (
          <ImageInputWrapper key={index}>
            <Input value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} placeholder={`URL изображения ${index + 1}`} />
            {product.imageUrls.length > 1 && <RemoveButton type="button" onClick={() => removeImageUrlField(index)}>×</RemoveButton>}
          </ImageInputWrapper>
        ))}
        <AddButton type="button" onClick={addImageUrlField}>+ Добавить фото</AddButton>
      </ImageUrlsSection>
      
      <ActionButtons>
        <SubmitButton type="submit">{productToEdit ? 'Сохранить изменения' : 'Добавить товар'}</SubmitButton>
        {productToEdit && <CancelButton type="button" onClick={onCancel}>Отмена</CancelButton>}
      </ActionButtons>
    </Form>
  );
};

export default ProductForm;

const Form = styled.form`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(0,0,0,0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #444;
  background: #222;
  color: var(--text-primary);
  font-size: 1rem;
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #444;
  background: #222;
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;
const ImageUrlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ImageInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const RemoveButton = styled.button` background: #ff6b6b; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; `;
const AddButton = styled.button` align-self: flex-start; background: transparent; border: 1px dashed #555; color: #999; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; `;
const ActionButtons = styled.div` display: flex; gap: 1rem; margin-top: 1rem; `;
const SubmitButton = styled.button` background: var(--accent); color: var(--bg-dark); padding: 0.8rem 1.5rem; border: none; border-radius: 5px; cursor: pointer; font-weight: 700; `;
const CancelButton = styled(SubmitButton)` background: #555; color: white; `;