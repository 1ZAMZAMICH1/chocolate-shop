// src/api/gist.js

import axios from 'axios';

const GIST_ID = import.meta.env.VITE_GIST_ID;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;

// Наш умный кеш
let cachedData = null;

// Функция для получения данных. Сначала смотрит в кеш.
export const getData = async () => {
  if (cachedData) {
    return cachedData;
  }

  try {
    console.log("CACHE MISS: Fetching data from Gist...");
    const response = await axios.get(GIST_URL, {
      headers: {
        // Добавляем заголовок, чтобы обходить кеш GitHub
        'Cache-Control': 'no-cache',
      }
    });
    
    const content = JSON.parse(response.data.files['choco-shop-db.json'].content);
    cachedData = content; // Сохраняем свежие данные в кеш
    return content;
  } catch (error) {
    console.error("Ошибка при получении данных из Gist:", error);
    throw error;
  }
};

// Функция для обновления данных. ГЛАВНОЕ: она сбрасывает кеш.
export const updateData = async (newData) => {
  try {
    console.log("UPDATING DATA: Clearing cache...");
    await axios.patch(
      GIST_URL,
      {
        files: {
          'choco-shop-db.json': {
            content: JSON.stringify(newData, null, 2),
          },
        },
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    
    // СБРАСЫВАЕМ КЕШ ПОСЛЕ УСПЕШНОГО ОБНОВЛЕНИЯ
    cachedData = null; 
    
    return true;
  } catch (error) {
    console.error("Ошибка при обновлении данных в Gist:", error);
    throw error;
  }
};