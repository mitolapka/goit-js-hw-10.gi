import axios from "axios";
import Notiflix from "notiflix";

axios.defaults.headers.common["x-api-key"] = "live_v8HdCyi6xtoaHXH0LsnkeTliHZ8wlqJ1UnsaMGJVzlF0aIZRfOESZPEgL4v1amTu";

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('select.breed-select');
  const catInfoDiv = document.querySelector('div.cat-info');

  fetchBreeds()
    .then(breeds => {
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

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        catInfoDiv.innerHTML = '';

        const image = document.createElement('img');
          image.src = cat.url;
            image.classList.add('cat-img');
        catInfoDiv.appendChild(image);

        const breedInfoUrl = `https://api.thecatapi.com/v1/breeds/${selectedBreedId}`;
        fetch(breedInfoUrl)
          .then(response => response.json())
            .then(breedInfo => {
              const catDiv = document.createElement('div');
                catDiv.classList.add('cat');
                catInfoDiv.appendChild(catDiv);

            const breedName = document.createElement('h3');
            breedName.textContent = breedInfo.name;
            catDiv.appendChild(breedName);

            const description = document.createElement('p');
            description.textContent = breedInfo.description;
            catDiv.appendChild(description);

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
