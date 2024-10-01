import { Injectable } from '@angular/core';
import { environtment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  get API_URL() {
    return environtment.api;
  }
}
