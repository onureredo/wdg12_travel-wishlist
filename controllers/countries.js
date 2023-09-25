import countries from '../countries.js';
import { validationResult } from 'express-validator';

// STEP 1
// export const getCountries = (req, res) => {
//   res.status(200).json(countries);
// };

export const getCountries = (req, res) => {
  const { sort, visited } = req.query;

  let filteredCountries = countries;

  if (visited) {
    const isVisited = visited === 'true';
    filteredCountries = countries.filter(
      (country) => country.visited === isVisited
    );
    res.status(200).json(filteredCountries);
  }

  //check if sort=true => sort alphabetically
  if (sort === 'true') {
    const sortedCountries = [...countries].sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    return res.status(200).json(sortedCountries);
  }
  res.status(200).json(countries);
};

// STEP 2
export const addCountry = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  const { name, alpha2Code, alpha3Code } = req.body;

  //check if required fields are provided
  if (!name || !alpha2Code || !alpha3Code) {
    return res.status(400).json({ message: 'something is missing' });
  }

  // Check if the country already exists
  const existingCountry = countries.find(
    (country) =>
      country.alpha2Code === alpha2Code || country.alpha3Code === alpha3Code
  );

  if (existingCountry) {
    return res.status(409).json({ message: 'country already exists' });
  }

  // if all checks passed, create and add the new country
  const newCountry = {
    id: countries.length + 1,
    name,
    alpha2Code,
    alpha3Code,
  };
  countries.push(newCountry);
  res.status(201).json(newCountry);
};

// STEP 3
export const getCountryByCode = (req, res) => {
  const { code } = req.params;

  const upperCase = code.toUpperCase();

  const country = countries.find(
    (country) =>
      country.alpha2Code === upperCase || country.alpha3Code === upperCase
  );

  if (!country) {
    return res.status(404).json({ message: 'country not found' });
  }
  res.status(200).json(country);
};

// STEP 4
export const updateCountry = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  const { code } = req.params;

  const index = countries.findIndex(
    (country) => country.alpha2Code === code || country.alpha3Code === code
  );

  // if country not found
  if (index === -1) {
    return res.status(404).json({ message: 'country not found' });
  }

  // update the country
  countries[index] = {
    ...countries[index],
    ...req.body,
  };

  res.status(200).json(countries[index]);
};

// STEP 5
export const deleteCountry = (req, res) => {
  const { code } = req.params;

  const index = countries.findIndex(
    (country) => country.alpha2Code === code || country.alpha3Code === code
  );

  // if country not found
  if (index === -1) {
    return res.status(404).json({ message: 'country not found' });
  }

  //   const deleteCountry = countries.splice(index, 1);
  //   res.status(200).json({ message: 'country deleted' });

  countries[index].visited = !countries[index].visited; // toggle
  res.status(200).json({
    message: 'country visit status updated',
    country: countries[index],
  });
};

// STEP 7
// export const getCountries = (req, res) => {
//   res.render('wishlist', { countries });
// };

// export const addCountry = (req, res) => {
//   const newCountry = {
//     id: countries.length + 1,
//     name: req.body.name,
//     alpha2Code: req.body.alpha2Code,
//     alpha3Code: req.body.alpha3Code,
//   };
//   countries.push(newCountry);
//   res.redirect('/api/countries');
// };
