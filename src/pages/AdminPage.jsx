import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getData, updateData } from '../api/gist';
import AdminLogin from '../components/AdminLogin';
import ProductForm from '../components/ProductForm';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({ products: [], orders: [], reviews: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdminAuthenticated') === 'true';
    if (isAdmin) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const gistData = await getData();
      setData({
        products: gistData.products || [],
        orders: gistData.orders || [],
        reviews: gistData.reviews || [],
      });
    } catch (error) { toast.error('Ошибка при загрузке данных!'); } 
    finally { setIsLoading(false); }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('isAdminAuthenticated', 'true');
    setIsAuthenticated(true);
    fetchData();
  };

  const handleProductSubmit = async (productData) => {
    const isEditing = !!productData.id;
    const loadingToast = toast.loading(isEditing ? 'Обновляем...' : 'Добавляем...');
    try {
      const currentData = await getData();
      let newProducts;
      if (isEditing) {
        newProducts = currentData.products.map(p => p.id === productData.id ? productData : p);
      } else {
        const newProduct = { ...productData, id: `prod${Date.now()}` };
        newProducts = [newProduct, ...currentData.products];
      }
      const newData = { ...currentData, products: newProducts };
      await updateData(newData);
      toast.dismiss(loadingToast);
      toast.success('Успешно!');
      setProductToEdit(null);
      setData(prev => ({ ...prev, products: newProducts }));
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Ошибка!');
    }
  };

  const handleProductDelete = async (productId) => {
    if (window.confirm('Уверены?')) {
      const loadingToast = toast.loading('Удаляем...');
      try {
        const currentData = await getData();
        const newProducts = currentData.products.filter(p => p.id !== productId);
        const newData = { ...currentData, products: newProducts };
        await updateData(newData);
        toast.dismiss(loadingToast);
        toast.success('Товар удален!');
        setData(prev => ({ ...prev, products: newProducts }));
      } catch(error) {
        toast.dismiss(loadingToast);
        toast.error('Ошибка!');
      }
    }
  };

  const handleReviewDelete = async (reviewId) => {
    if (window.confirm('Уверены?')) {
      const loadingToast = toast.loading('Удаляем отзыв...');
      try {
        const currentData = await getData();
        const newReviews = currentData.reviews.filter(r => r.id !== reviewId);
        const newData = { ...currentData, reviews: newReviews };
        await updateData(newData);
        toast.dismiss(loadingToast);
        toast.success('Отзыв удален!');
        setData(prev => ({ ...prev, reviews: newReviews }));
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error('Ошибка!');
      }
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    const loadingToast = toast.loading('Обновляем статус заказа...');
    try {
        const currentData = await getData();
        const newOrders = currentData.orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        const newData = { ...currentData, orders: newOrders };
        await updateData(newData);
        toast.dismiss(loadingToast);
        toast.success('Статус заказа обновлен!');
        setData(prev => ({ ...prev, orders: newOrders }));
    } catch (error) {
        toast.dismiss(loadingToast);
        toast.error('Ошибка при обновлении статуса!');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <AdminLogin onLogin={handleLogin} />;
  
  return (
    <AdminContainer>
      <Title>Панель Администратора</Title>
      <Tabs>
        <TabButton active={activeTab === 'products'} onClick={() => setActiveTab('products')}>Товары ({(data.products || []).length})</TabButton>
        <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>Заказы ({(data.orders || []).length})</TabButton>
        <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Отзывы ({(data.reviews || []).length})</TabButton>
      </Tabs>

      {activeTab === 'products' && (
        <TabContent>
          <ProductForm onSubmit={handleProductSubmit} productToEdit={productToEdit} onCancel={() => setProductToEdit(null)} />
          <ItemList>
            {(data.products || []).map(product => (
              <Item key={product.id}>
                <ItemInfo>
                  <img src={product.imageUrl} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price} ₽</span>
                  </div>
                </ItemInfo>
                <ItemActions>
                  <ActionButton onClick={() => setProductToEdit(product)}>Редактировать</ActionButton>
                  <DeleteButton onClick={() => handleProductDelete(product.id)}>Удалить</DeleteButton>
                </ItemActions>
              </Item>
            ))}
          </ItemList>
        </TabContent>
      )}

      {activeTab === 'orders' && (
        <TabContent>
          <ItemList>
            {(data.orders && data.orders.length > 0) ? (data.orders || []).map(order => (
              <Item key={order.id}>
                <ItemInfo>
                  <div>
                    <strong>Заказ от {new Date(order.date).toLocaleString()}</strong>
                    <p>Товар: {order.productName} - {order.price} ₽</p>
                    <p>Клиент: {order.customer?.fio}, {order.customer?.phone}</p>
                    <p>Адрес: {order.customer?.city}, {order.customer?.address}</p>
                    <p>Доставка: {order.customer?.delivery} | Связь: {order.customer?.communication}</p>
                  </div>
                </ItemInfo>
                <ItemActions>
                   <StatusSelect value={order.status || 'new'} onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}>
                    <option value="new">Новый</option>
                    <option value="processing">В обработке</option>
                    <option value="completed">Выполнен</option>
                    <option value="cancelled">Отменен</option>
                  </StatusSelect>
                </ItemActions>
              </Item>
            )) : <p>Новых заказов нет.</p>}
          </ItemList>
        </TabContent>
      )}

      {activeTab === 'reviews' && (
        <TabContent>
          <ItemList>
            {(data.reviews && data.reviews.length > 0) ? data.reviews.map(review => (
              <Item key={review.id}>
                <ItemInfo>
                  <div>
                    <strong>{review.name} (Рейтинг: {review.rating}/5)</strong>
                    <p>"{review.text}"</p>
                    <small>{new Date(review.date).toLocaleString()}</small>
                  </div>
                </ItemInfo>
                <ItemActions>
                  <DeleteButton onClick={() => handleReviewDelete(review.id)}>Удалить</DeleteButton>
                </ItemActions>
              </Item>
            )) : <p>Отзывов нет.</p>}
          </ItemList>
        </TabContent>
      )}
    </AdminContainer>
  );
};

export default AdminPage;

const AdminContainer = styled.div` width: 90%; max-width: 1000px; margin: 0 auto; padding: 120px 0 50px; `;
const Title = styled.h1` font-family: 'Cormorant Garamond', serif; text-align: center; font-size: 3rem; color: var(--accent); margin-bottom: 2rem; `;
const Tabs = styled.div` display: flex; justify-content: center; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); `;
const TabButton = styled.button` padding: 1rem 2rem; font-size: 1.2rem; font-weight: 700; border: none; background: none; color: ${({ active }) => (active ? 'var(--accent)' : 'var(--text-secondary)')}; border-bottom: 2px solid ${({ active }) => (active ? 'var(--accent)' : 'transparent')}; cursor: pointer; transition: color 0.3s, border-color 0.3s; `;
const TabContent = styled.div``;
const ItemList = styled.div` display: flex; flex-direction: column; gap: 1rem; `;
const Item = styled.div` display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: rgba(0,0,0,0.15); border-radius: 8px; flex-wrap: wrap; gap: 1rem; `;
const ItemInfo = styled.div` display: flex; align-items: center; gap: 1rem; flex-grow: 1; img { width: 60px; height: 60px; object-fit: cover; border-radius: 5px; } div { display: flex; flex-direction: column; gap: 0.5rem; } p { margin: 0; color: var(--text-secondary); font-size: 1.4rem; } `;
const ItemActions = styled.div` display: flex; gap: 1rem; flex-shrink: 0; `;
const ActionButton = styled.button` padding: 0.5rem 1rem; border: 1px solid var(--accent); background: transparent; color: var(--accent); border-radius: 5px; cursor: pointer; &:hover { background: var(--accent); color: var(--bg-dark); } `;
const DeleteButton = styled(ActionButton)` border-color: #ff6b6b; color: #ff6b6b; &:hover { background: #ff6b6b; color: var(--text-primary); } `;
const StatusSelect = styled.select` padding: 0.5rem 1rem; border-radius: 5px; border: 1px solid #444; background: #222; color: var(--text-primary); font-size: 1.4rem; cursor: pointer; &:focus { outline: none; border-color: var(--accent); } `;