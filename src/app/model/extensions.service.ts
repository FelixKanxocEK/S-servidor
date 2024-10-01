import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { lastValueFrom } from 'rxjs';
import { Extensions } from '../pages/extensions/extensions/interfaces/extensions.interface';

@Injectable({
  providedIn: 'root'
})
export class ExtensionsService {

  constructor(
    private readonly HttpClient: HttpClient, 
    private readonly UtilsService: UtilsService
  ) { }

  async getExtensions(): Promise<Extensions> {
    try {
      
      const result = await lastValueFrom(this.HttpClient.get<Extensions>(`${this.UtilsService.API_URL}/extensions`));

      if(result) {
        console.log(result, ' jajaja');
        return result;
      } else {
        return {
          cdr: [],
          extensions: [],
        };
      }

    } catch (error) {
      console.log(error)
      return {
        cdr: [],
        extensions: [],
      };
    }
  }

}
