'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>

  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

//  https://restcountries.com/v2/

// 1 our first ajax call : xml http request

// 2 welcome to callback Hell

// const getCountryAndNeighbour = function (country) {
//   // ajax call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);

//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data);

//     // render country
//     renderCountry(data);

//     // get neighbour country 2

//     // const [neighbour] = data.borders;
//     const neighbour = data.borders?.[0];

//     // ajax call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       // console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// // getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');

// 3 Promises and the Fetch Api and

// old way

// const NewRequest = new XMLHttpRequest();NewRequest.open('GET', `https://restcountries.com/v2/name/${country}`);
// NewRequest.send();

// fetch api
const newRequest = fetch('https://restcountries.com/v2/name/portugal');
// console.log(newRequest);

// 4 consuming promises

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// getCountryData('usa');

// 5 chaining promises

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       // err => alert(err)

//       if (!response.ok)
//         throw new Error(`country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data);
//       const neighbour = data[0].borders?.[0];

//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(
//       response => response.json()
//       // err => alert(err)
//     )
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       // console.error(`${err} `);
//       renderError(`something went wrong ${err.message}. try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getJson = function (url, errorMsg = 'something went wrong') {
//   return fetch(url).then(response => {
//     console.log(response);

//     // err => alert(err)

//     if (!response.ok) throw new Error(` ${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   getJson(`https://restcountries.com/v2/name/${country}`, 'country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data);
//       const neighbour = data[0].borders?.[0];
//       throw new Error('no neighbour found');

//       return getJson(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       // console.error(`${err} `);
//       renderError(`something went wrong ${err.message}. try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

// challenge 1
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?json=1 `)
//     .then(response => {
//       // console.log(response);

//       if (!response.ok)
//         throw new Error(`(${response.status}) plese try after some time`);

//       return response.json();
//     })
//     .then(data => {
//       // console.log(data);
//       // console.log(`you are in ${data.city} ,${data.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`country not found ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(error => console.error(`something went wrong ${error.message}`));
// };

// btn.addEventListener('click', function () {
//   whereAmI(-33.933, 18.474);
//   whereAmI(41.3189957, 2.0746469);
// });

// 252   EVENT LOOP IN PRACTISE
// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('resolve promise 1').then(res => console.log(res));

// Promise.resolve('resolved promise 2').then(res => {
//   for (let i = 0; i < 10000; i++) {
//     console.log(res);
//   }
// });

// console.log('Test END');

// 259 Building a Simple Promise

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('lottery happen');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('you win');
    } else {
      reject(new Error('you lose '));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setimeout

// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('1 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('5 second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('6 second');
//     return wait(1);
//   });

//  260 promisifying the geolocation

const getLocation = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getLocation().then(res => console.log(res.coords));

const whereAmI = function () {
  getLocation()
    .then(response => {
      const { Latitude: lat, longitude: lng } = response.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?json=1 `);
    })
    .then(response => {
      // console.log(response);

      if (!response.ok)
        throw new Error(`(${response.status}) plese try after some time`);

      return response.json();
    })
    .then(data => {
      console.log(data);
      // console.log(`you are in ${data.city} ,${data.country}`);
      return fetch(
        `https://restcountries.com/v2/name/${data.standard.countryname}`
      );
    })
    .then(response => {
      if (!response.ok) throw new Error(`country not found ${response.status}`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(error => console.error(`something went wrong ${error.message}`));
};

btn.addEventListener('click', whereAmI);

// 261  coding challenge 2

const createImage = function () {};
