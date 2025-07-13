import React, { useState } from 'react';
import styled from 'styled-components';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Вход в панель администратора</Title>
        <Input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">Войти</SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </LoginContainer>
  );
};

export default AdminLogin;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: var(--ui-background);
  border: 1px solid var(--ui-border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  text-align: center;
  color: var(--text-primary);
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
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
`;