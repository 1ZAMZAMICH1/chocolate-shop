// src/api/gist.js
import axios from 'axios';

const GIST_ID = import.meta.env.VITE_GIST_ID;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;

// Кэш для данных, чтобы не делать лишних запросов
let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

export const getData = async () => {
  const now = Date.now();
  // Если есть кэш и он не протух, возвращаем его
  if (cachedData && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedData;
  }

  try {
    const response = await axios.get(GIST_URL);
    const content = JSON.parse(response.data.files['choco-shop-db.json'].content);
    cachedData = content; // Сохраняем в кэш
    lastFetchTime = now; // Обновляем время
    return content;
  } catch (error) {
    console.error("Ошибка при получении данных из Gist:", error);
    throw error;
  }
};

export const updateData = async (newData) => {
  try {
    await axios.patch(
      GIST_URL,
      {
        files: {
          'choco-shop-db.json': {
            content: JSON.stringify(newData, null, 2), // null, 2 для красивого форматирования
          },
        },
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    // Сбрасываем кэш после обновления
    cachedData = null; 
    return true;
  } catch (error) {
    console.error("Ошибка при обновлении данных в Gist:", error);
    throw error;
  }
};