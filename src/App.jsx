import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';
import FallingBackground from './components/FallingBackground';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';
import ReviewsPage from './pages/ReviewsPage'; // <-- Импорт
import ContactsPage from './pages/ContactsPage'; // <-- Импорт

const AppWrapper = styled.div` /* ... */ `;

function App() {
  return (
      <Router>
        <GlobalStyle />
        <FallingBackground />
        <AppWrapper>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/reviews" element={<ReviewsPage />} /> {/* <-- Новый роут */}
              <Route path="/contacts" element={<ContactsPage />} /> {/* <-- Новый роут */}
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </AppWrapper>
      </Router>
  );
}
export default App;