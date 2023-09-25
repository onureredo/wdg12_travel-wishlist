import { Router } from 'express';
import {
  addCountry,
  deleteCountry,
  getCountries,
  getCountryByCode,
  updateCountry,
} from '../controllers/countries.js';
import { countryValidator } from '../validator/countryValidator.js';

const countryRouter = Router();

countryRouter.get('/', getCountries);
countryRouter.get('/:code', getCountryByCode);
countryRouter.post('/', countryValidator, addCountry);
countryRouter.put('/:code', countryValidator, updateCountry);
countryRouter.delete('/:code', deleteCountry);

export default countryRouter;
