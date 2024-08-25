import { Injectable } from '@angular/core';
import { Config, QueryData } from '../../index';
import { map } from 'rxjs';
import { ApiService } from '../..';
@Injectable()
export class ItemService {
  spData: any = new QueryData();
  controllerName = Config.url.ecomLocalUrl + "Item";
  constructor(private apiSvc: ApiService) { this.spData.pageNo = 0; }
  getItemCategory() {
    try {
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetItemCategory`, { data: JSON.stringify(this.spData) })
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }
  getMealItemList() {
    try {
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetMealItemList`, { data: JSON.stringify(this.spData) })
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }

  getAddOnItems() {
    try {
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetAddOnItems`, { data: JSON.stringify(this.spData) })
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }

  getBestSellingItem(maxNoItem: number, maxNoOfDays: number, categoryIDs: string) {
    try {
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetBestSellingItem`, { data: JSON.stringify(this.spData), maxNoItem: maxNoItem, maxNoOfDays: maxNoOfDays, categoryIDs: categoryIDs == null ? '' : categoryIDs })
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }

  getUniqueItem() {
    try {
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetUniqueItem`, { data: JSON.stringify(this.spData), isFormatted: false })
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }

  getUniqueItemWiseTopping(itemDetailCodeItemID?: number) {
    try {
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetUniqueItemWiseTopping`, { data: JSON.stringify(this.spData), itemDetailCodeItemID: itemDetailCodeItemID == null ? '' : itemDetailCodeItemID })
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }

  getBannerItem(slug:string) {
    try {
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetBannerItem`, { data: JSON.stringify(this.spData), slug: slug })
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }

  getMealItems(mealID?: number) {
    try {
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetMealItems`, { data: JSON.stringify(this.spData), mealID: mealID == null ? '' : mealID})
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }

  getItemsVariationData(itemDetailCodeItemID: number) {
    try {
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetItemsVariationData`, { itemDetailCodeItemID: itemDetailCodeItemID, data: JSON.stringify(this.spData) })
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }

  getItemsSwipeData(mealItemDetailID: number) {
    try {
      return this.apiSvc
        .executeQuery(`${this.controllerName}/GetItemsSwipeData`, { parentMealItemID: mealItemDetailID, data: JSON.stringify(this.spData) })
        .pipe(
          map((response: any) => {
            return response.body;
          })
        );
    } catch (e) {
      throw e;
    }
  }

}