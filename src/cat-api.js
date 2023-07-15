// cat-api.js

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  // Додаткові CSS класи для показу/приховування завантажувача та помилки
  const breedSelect = document.querySelector('select.breed-select');
  const loader = document.querySelector('p.loader');
  const error = document.querySelector('p.error');
  breedSelect.classList.add('hidden');
  loader.classList.remove('hidden');
  error.classList.add('hidden');

  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Помилка при отриманні колекції порід:', error);
      throw error; // Прокидуємо помилку далі, щоб її можна було обробити на вищому рівні
    })
    .finally(() => {
      breedSelect.classList.remove('hidden');
      loader.classList.add('hidden');
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  // Додаткові CSS класи для показу/приховування завантажувача, блоку інформації про кота та помилки
  const catInfoDiv = document.querySelector('div.cat-info');
  const loader = document.querySelector('p.loader');
  const error = document.querySelector('p.error');
  catInfoDiv.classList.add('hidden');
  loader.classList.remove('hidden');
  error.classList.add('hidden');

  return fetch(url)
    .then(response => response.json())
    .then(data => data[0])
    .catch(error => {
      console.error('Помилка при отриманні даних про кота:', error);
      throw error; // Прокидуємо помилку далі, щоб її можна було обробити на вищому рівні
    })
    .finally(() => {
      catInfoDiv.classList.remove('hidden');
      loader.classList.add('hidden');
    });
}
