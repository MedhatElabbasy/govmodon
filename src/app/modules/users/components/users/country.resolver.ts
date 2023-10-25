import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';

@Injectable({
  providedIn: 'root'
})
export class CountryResolver implements Resolve<Country[]> {
  constructor(private countries: CountryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<Country[]> {
    return this.countries.getAllCountries();
  }
}
