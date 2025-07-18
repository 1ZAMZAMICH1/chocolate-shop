import axios from 'axios';

const GIST_ID = import.meta.env.VITE_GIST_ID;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;

let cachedData = null;

export const getData = async () => {
  if (cachedData) {
    return cachedData;
  }

  try {
    console.log("CACHE MISS: Fetching data from Gist...");
    const response = await axios.get(GIST_URL, {
      headers: {
        // ВОТ ГЛАВНОЕ ИСПРАВЛЕНИЕ: МЫ СНОВА ПЕРЕДАЕМ ТОКЕН
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
    
    const content = JSON.parse(response.data.files['choco-shop-db.json'].content);
    cachedData = content;
    return content;
  } catch (error) {
    console.error("Ошибка при получении данных из Gist:", error);
    // Проверяем, есть ли у нас старые данные в кеше на случай ошибки сети
    if(cachedData) return cachedData;
    throw error;
  }
};

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
    
    cachedData = null; 
    
    return true;
  } catch (error) {
    console.error("Ошибка при обновлении данных в Gist:", error);
    throw error;
  }
};