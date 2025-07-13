import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getData, updateData } from '../api/gist';
import AdminLogin from '../components/AdminLogin';
import ProductForm from '../components/ProductForm';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({ products: [], orders: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchData = useCallback(async (showToast = false) => {
    setIsLoading(true);
    try {
      const gistData = await getData();
      setData(gistData);
      if (showToast) toast.success('Данные успешно обновлены!');
    } catch (error) {
      toast.error('Ошибка при загрузке данных!');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [fetchData]);

  const handleLogin = () => {
    sessionStorage.setItem('isAdmin', 'true');
    setIsAuthenticated(true);
  };

  const handleProductSubmit = async (productData) => {
    const isEditing = !!productData.id;
    const loadingToast = toast.loading(isEditing ? 'Обновляем товар...' : 'Добавляем товар...');
    
    try {
      const currentData = await getData();
      const newData = { ...currentData };
      
      if (isEditing) {
        const index = newData.products.findIndex(p => p.id === productData.id);
        newData.products[index] = productData;
      } else {
        const newProduct = { ...productData, id: `prod${Date.now()}` };
        newData.products.unshift(newProduct);
      }
      
      await updateData(newData);
      toast.dismiss(loadingToast);
      toast.success(isEditing ? 'Товар успешно обновлен!' : 'Товар успешно добавлен!');
      setProductToEdit(null);
      setData(newData);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Произошла ошибка!');
    }
  };

  const handleProductDelete = async (productId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      const loadingToast = toast.loading('Удаляем товар...');
      try {
        const currentData = await getData();
        const newData = { ...currentData, products: currentData.products.filter(p => p.id !== productId) };
        await updateData(newData);
        toast.dismiss(loadingToast);
        toast.success('Товар удален!');
        setData(newData);
      } catch(error) {
        toast.dismiss(loadingToast);
        toast.error('Ошибка при удалении!');
      }
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    const loadingToast = toast.loading('Обновляем статус...');
    try {
        const currentData = await getData();
        const newData = { ...currentData };
        const orderIndex = newData.orders.findIndex(o => o.id === orderId);
        if(orderIndex !== -1) {
            newData.orders[orderIndex].status = newStatus;
            await updateData(newData);
            toast.dismiss(loadingToast);
            toast.success('Статус заказа обновлен!');
            setData(newData);
        }
    } catch (error) {
        toast.dismiss(loadingToast);
        toast.error('Ошибка при обновлении статуса!');
    }
  };
  
  if (isLoading && !data.products.length) return <LoadingSpinner />;
  if (!isAuthenticated) return <AdminLogin onLogin={handleLogin} />;
  
  return (
    <AdminContainer>
      <Title>Панель Администратора</Title>
      <Tabs>
        <TabButton active={activeTab === 'products'} onClick={() => setActiveTab('products')}>Товары ({data.products.length})</TabButton>
        <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>Заказы ({data.orders.length})</TabButton>
      </Tabs>

      {activeTab === 'products' && (
        <TabContent>
          <ProductForm onSubmit={handleProductSubmit} productToEdit={productToEdit} onCancel={() => setProductToEdit(null)} />
          <ItemList>
            {data.products.map(product => (
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
            {data.orders.length > 0 ? data.orders.map(order => (
              <Item key={order.id}>
                <ItemInfo>
                  <div>
                    <strong>Заказ #{order.id.slice(-5)} от {new Date(order.date).toLocaleString()}</strong>
                    <span>{order.productName} - {order.price} ₽</span>
                    <span>{order.customerName}, {order.customerContact}</span>
                  </div>
                </ItemInfo>
                <ItemActions>
                  <Select value={order.status} onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}>
                    <option value="new">Новый</option>
                    <option value="processing">В обработке</option>
                    <option value="completed">Выполнен</option>
                    <option value="cancelled">Отменен</option>
                  </Select>
                </ItemActions>
              </Item>
            )) : <p>Новых заказов нет.</p>}
          </ItemList>
        </TabContent>
      )}
    </AdminContainer>
  );
};

export default AdminPage;

const AdminContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 120px 0 50px;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  text-align: center;
  font-size: 3rem;
  color: var(--accent);
  margin-bottom: 2rem;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--ui-border);
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  background: none;
  color: ${({ active }) => (active ? 'var(--accent)' : 'var(--text-secondary)')};
  border-bottom: 2px solid ${({ active }) => (active ? 'var(--accent)' : 'transparent')};
  cursor: pointer;
  transition: color 0.3s, border-color 0.3s;
`;

const TabContent = styled.div``;
const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--ui-background);
  border: 1px solid var(--ui-border);
  border-radius: 8px;
  flex-wrap: wrap;
  gap: 1rem;
`;
const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 5px;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;
const ItemActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
`;
const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: var(--accent);
    color: var(--bg-dark);
  }
`;
const DeleteButton = styled(ActionButton)`
  border-color: #ff6b6b;
  color: #ff6b6b;
  &:hover {
    background: #ff6b6b;
    color: var(--text-primary);
  }
`;
const Select = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #444;
  background: #222;
  color: var(--text-primary);
`;