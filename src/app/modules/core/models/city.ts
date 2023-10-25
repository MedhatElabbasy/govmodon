import { Country } from './../../users/models/country';

export interface City {
    id: number;
    name: string;
    nameEN: string;
    isDeleted: boolean;
    countryId: number;
    country: Country;
  }
  