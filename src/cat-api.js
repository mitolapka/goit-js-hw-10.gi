export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  const breedSelect = document.querySelector('select.breed-select');
  const loader = document.querySelector('p.loader');
  const error = document.querySelector('p.error');
  breedSelect.classList.add('hidden');
  loader.classList.remove('hidden');
  error.classList.add('hidden');

  return fetch(url)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Помилка при отриманні даних про кота');
      }
      return response.json();
    })
    .then(data => {
      breedSelect.classList.remove('hidden');
      loader.classList.add('hidden');
      return data;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  const catInfoDiv = document.querySelector('div.cat-info');
  const loader = document.querySelector('p.loader');
  const error = document.querySelector('p.error');
  catInfoDiv.classList.add('hidden');
  loader.classList.remove('hidden');
  error.classList.add('hidden');

  return fetch(url)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Помилка при отриманні даних про кота');
      }
      return response.json();
    })
    .then(data => {
      catInfoDiv.classList.remove('hidden');
      loader.classList.add('hidden');
      return data[0];
    });
}
