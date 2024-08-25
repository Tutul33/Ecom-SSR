import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/app-shared/models/config';
import { QueryData } from 'src/app/shared/models/common.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  spData: any = new QueryData();
  controllerName = Config.url.ecomLocalUrl + "Sales";
  constructor(private apiSvc: ApiService) { this.spData.pageNo = 0; }
  getEComPageConfig() {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetEComPageConfig`, { data: JSON.stringify(this.spData) })
      .pipe(
        map((response: any) => {
          return response.body[response.body.length - 1] || [];
        })
      );
  }
  getEComPageManagement(pageSlug?:string) {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetEComPageManagement`, { data: JSON.stringify(this.spData), pageSlug: pageSlug })
      .pipe(
        map((response: any) => {
          return response.body[response.body.length - 1] || [];
        })
      );
  }


}
