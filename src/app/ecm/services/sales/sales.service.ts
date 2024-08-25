import { Injectable } from '@angular/core';
import { Config } from '../../index';
import { map } from 'rxjs';
import { ApiService } from '../..';
@Injectable()
export class SalesDataService {
  controllerName = Config.url.ecomLocalUrl + "Sales";
  constructor(private apiSvc: ApiService) { }

}