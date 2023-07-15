import axios from "axios";
import Notiflix from "notiflix";

axios.defaults.headers.common["x-api-key"] = "live_v8HdCyi6xtoaHXH0LsnkeTliHZ8wlqJ1UnsaMGJVzlF0aIZRfOESZPEgL4v1amTu";

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('select.breed-select');
  const catInfoDiv = document.querySelector('div.cat-info');

  // Виконати запит за колекцією порід
  fetchBreeds()
    .then(breeds => {
      // Додати опції до селекта
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Помилка при отриманні колекції порід:', error);
    });

  // Обробник події вибору опції в селекті
  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    // Виконати запит за даними про кота за ідентифікатором породи
    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        // Очистити попередні дані, якщо такі є
        catInfoDiv.innerHTML = '';

        // Створити та додати зображення
        const image = document.createElement('img');
          image.src = cat.url;
            image.classList.add('cat-img');
        catInfoDiv.appendChild(image);

        // Виконати запит за додатковою інформацією про породу
        const breedInfoUrl = `https://api.thecatapi.com/v1/breeds/${selectedBreedId}`;
        fetch(breedInfoUrl)
          .then(response => response.json())
            .then(breedInfo => {
              const catDiv = document.createElement('div');
                catDiv.classList.add('cat');
                catInfoDiv.appendChild(catDiv);
            // Створити та додати назву породи
            const breedName = document.createElement('h3');
            breedName.textContent = breedInfo.name;
            catDiv.appendChild(breedName);

            // Створити та додати опис породи
            const description = document.createElement('p');
            description.textContent = breedInfo.description;
            catDiv.appendChild(description);

            // Створити та додати темперамент породи
            const temperament = document.createElement('p');
                const temperamentLabel = document.createElement('span');
                temperamentLabel.classList.add('cat-span');
temperamentLabel.textContent = 'Temperament: ';
temperament.appendChild(temperamentLabel);
temperament.appendChild(document.createTextNode(breedInfo.temperament));
catDiv.appendChild(temperament);

            
          })
          .catch(error => {
            console.error('Помилка при отриманні даних про породу:', error);
          });
      })
      .catch(error => {
        console.error('Помилка при отриманні даних про кота:', error);
      });
  });
});
