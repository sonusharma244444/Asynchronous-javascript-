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

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('lottery happen');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('you win');
//     } else {
//       reject(new Error('you lose '));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

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

// const getLocation = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getLocation().then(res => console.log(res.coords));

// const whereAmI = function () {
//   getLocation()
//     .then(response => {
//       const { Latitude: lat, longitude: lng } = response.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?json=1 `);
//     })
//     .then(response => {
//       // console.log(response);

//       if (!response.ok)
//         throw new Error(`(${response.status}) plese try after some time`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       // console.log(`you are in ${data.city} ,${data.country}`);
//       return fetch(
//         `https://restcountries.com/v2/name/${data.standard.countryname}`
//       );
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

// btn.addEventListener('click', whereAmI);

// 261  coding challenge 2

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('image not found'));
//     });
//   });
// };

// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };

// let currentImage;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .catch(err => console.log(err));

// 262  consuming promises with async await

// const getLocation = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     // geolocation
//     const pos = await getLocation();

//     const { latitude: lat, longitude: lng } = pos.coords;

//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1 `);

//     if (!resGeo.ok) throw new Error('problem getting location data');

//     const dataGeo = await resGeo.json();
//     // console.log(dataGeo);

//     const res = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.country}`
//     );
//     if (!resGeo.ok) throw new Error('problem getting country');
//     // console.log(res);

//     const data = await res.json();
//     // console.log(data);

//     renderCountry(data[0]);

//     return `you are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.log(`${err}`);
//     renderError(`something went wrong ${err.message}`);

//     // reject promise returned from  function
//     throw err;
//   }
// };

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

//  265 returning values from async function
// console.log('1 :will get location');

// whereAmI()
//   .then(city => {
//     console.log(city);
//   })
//   .catch(err => console.error(err))
//   .finally(() => console.log('2:finished getting location'));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2 ${city}`);
//   } catch (err) {
//     console.error(`3 ${err}`);
//   }
//   console.log('4:finished getting location');
// })();

// 265 running promises in parallel

const getJson = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    // console.log(response);

    // err => alert(err)

    if (!response.ok) throw new Error(` ${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const get3Countries = async function (c1, c2, c3) {
//   try {
// const [data1] = await getJson(`https://restcountries.com/v2/name/${c1}`);
// const [data2] = await getJson(`https://restcountries.com/v2/name/${c2}`);
// const [data3] = await getJson(`https://restcountries.com/v2/name/${c3}`);
// console.log([data1.capital, data2.capital, data3.capital]);

//     const data = await Promise.all([
//       getJson(`https://restcountries.com/v2/name/${c1}`),
//       getJson(`https://restcountries.com/v2/name/${c2}`),
//       getJson(`https://restcountries.com/v2/name/${c3}`),
//     ]);

//     console.log(data.map(d => d[0].capital));
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('portugal', 'canada', 'USA');

// 266 Other Promise Combinator :race, allsettled and any

// promise.race
(async function () {
  const data = await Promise.race([
    getJson(`https://restcountries.com/v2/name/italy`),
    getJson(`https://restcountries.com/v2/name/canada`),
    getJson(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(data[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJson(`https://restcountries.com/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// // promise.allsettled

// Promise.allSettled([
//   Promise.resolve('success'),
//   Promise.reject('error'),
//   Promise.resolve('success'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('success'),
//   Promise.reject('error'),
//   Promise.resolve('success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// promise.any [ES2021]
Promise.any([
  Promise.resolve('succ'),
  Promise.reject('error'),
  Promise.resolve('succe'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
