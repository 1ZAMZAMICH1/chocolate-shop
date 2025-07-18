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
    const response = await axios.get(GIST_URL, {
      headers: {
        // ОСТАВЛЯЕМ ТОЛЬКО ТОКЕН. ВСЕ ЛИШНЕЕ УБИРАЕМ.
        'Authorization': `token ${GITHUB_TOKEN}`,
      }
    });
    
    const content = JSON.parse(response.data.files['choco-shop-db.json'].content);
    cachedData = content;
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