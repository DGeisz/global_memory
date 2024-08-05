import countries from "./countries.json";
import states from "./us_states.json";

function toLowerCaseKeys(obj) {
  // Check if the input is an object or array
  if (Array.isArray(obj)) {
    // If it's an array, recursively apply the function to each element
    return obj.map((item) => toLowerCaseKeys(item));
  } else if (obj !== null && typeof obj === "object") {
    // If it's an object, convert its keys to lowercase
    return Object.keys(obj).reduce((accumulator, key) => {
      const lowerCaseKey = key.toLowerCase();
      accumulator[lowerCaseKey] = toLowerCaseKeys(obj[key]);
      return accumulator;
    }, {});
  }
  // If it's neither an object nor an array, return the value as is
  return obj;
}

export const geoCountries = toLowerCaseKeys(countries).features;

export const geoItems = [...geoCountries, ...states.features];

export const geoItemMap = geoItems.reduce((acc, item) => {
  acc[item.properties.name] = item;
  return acc;
}, {});
