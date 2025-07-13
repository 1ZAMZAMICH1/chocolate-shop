import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  const assets = {
    rose_front: "https://res.cloudinary.com/dyuywnfy3/image/upload/f_png/v1752349310/412e94d4-afc5-4611-a150-df9c22f39582.png",
    rose_profile: "https://res.cloudinary.com/dyuywnfy3/image/upload/f_png/v1752349315/d4818509-f0ed-4293-9c00-b8d173cb24e3.png",
    peony_up: "https://res.cloudinary.com/dyuywnfy3/image/upload/f_png/v1752349560/04b86e2f-38b7-49f5-8bd3-f0709534dd1a.png",
    peony_front: "https://res.cloudinary.com/dyuywnfy3/image/upload/f_png/v1752349547/8d7419bf-2798-44de-bcf0-aa7b61941829.png",
    choco_1: "https://res.cloudinary.com/dyuywnfy3/image/upload/f_png/v1752349742/34b12caa-e3ea-4fb9-bb1c-21af58548302.png",
    choco_2: "https://res.cloudinary.com/dyuywnfy3/image/upload/f_png/v1752349750/ae1a68aa-3c98-4183-a300-1041c750c2ec.png"
  };

  return (
    <ParallaxProvider>
      <GlobalStyle />
      <BackgroundElements>
        <Parallax speed={-15}><Element src={assets.peony_front} alt="" style={{ top: '15%', left: '5%', width: '180px' }} /></Parallax>
        <Parallax speed={10}><Element src={assets.choco_1} alt="" style={{ top: '60%', left: '15%', width: '80px' }} /></Parallax>
        <Parallax speed={-10}><Element src={assets.rose_front} alt="" style={{ top: '20%', right: '10%', width: '150px' }} /></Parallax>
        <Parallax speed={20}><Element src={assets.choco_2} alt="" style={{ top: '75%', right: '5%', width: '100px' }} /></Parallax>
        <Parallax speed={5}><Element src={assets.rose_profile} alt="" style={{ bottom: '10%', left: '45%', width: '120px' }} /></Parallax>
        <Parallax speed={-5}><Element src={assets.peony_up} alt="" style={{ bottom: '15%', right: '25%', width: '160px' }} /></Parallax>
      </BackgroundElements>
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      <PageContent>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
        </Suspense>
        <Footer />
      </PageContent>
    </ParallaxProvider>
  );
}

export default App;

const PageContent = styled.div`
  position: relative;
  z-index: 2;
  background-color: transparent; 
`;

const BackgroundElements = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-dark) 50%, var(--bg-gradient-end) 100%);
  overflow: hidden;
`;

const Element = styled.img`
  position: absolute;
  opacity: 0.8; 
  @media (max-width: 768px) {
    opacity: 0.4;
    filter: blur(1px);
  }
`;