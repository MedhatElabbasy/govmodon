import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly url = environment.apiUrl;
  countries!: Country[];
  private countryUpdates = new Subject<Country[]>();
  constructor(private http: HttpClient) {}

  get updates() {
    return this.countryUpdates.asObservable();
  }

  getAllCountries() {
    return this.http
      .get<Country[]>(this.url + `api/Country/GetAllCountry`)
      .pipe(
        tap((res) => {
          this.countries = [...res];
          this.countryUpdates.next([...this.countries]);
        })
      );
  }
}
