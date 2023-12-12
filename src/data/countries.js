import axios from "axios";

const apiURL = "https://restcountries.com/v3.1/all";

export const fetchCountries = async () => {
  try {
    const response = await axios.get(apiURL);

    if (response.status === 200) {
      const countriesData = response.data;
      const randomCountries = [];
      const simplifiedCountry = {};

      while (randomCountries.length < 5) {
        const randomIndex = Math.floor(Math.random() * countriesData.length);
        const randomCountry = countriesData[randomIndex];

        if (randomCountry.capital === undefined) {
          randomCountry.capital = randomCountry.name.common;
        }
        simplifiedCountry[randomCountry.name.common] = randomCountry.capital;

        randomCountries.push(randomCountry);
        countriesData.splice(randomIndex, 1);
      }

      return simplifiedCountry;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
