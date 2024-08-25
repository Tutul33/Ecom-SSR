import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BaseComponent,
  ProviderService,
  ECommModelService,
} from '../index';
import { SalesService } from 'src/app/app-shared';

@Component({
  selector: 'app-ecom',
  templateUrl: './ecom.component.html',
  providers: [ECommModelService]
})
export class EcomComponent extends BaseComponent implements OnInit {
  pageContent: any = {};
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    private slsSvc: SalesService,
    private actRoute: ActivatedRoute
  ) {
    super(providerSvc);
  }
  ngOnInit(): void {
    try {
      this.actRoute.params.subscribe(params =>
        this.getEComPageManagement(params['pageSlug'])
      )
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getEComPageManagement(pageSlug: string) {
    try {
      if (pageSlug) {
        this.slsSvc.getEComPageManagement(pageSlug).subscribe({
          next: (res: any) => {
            if(res.length > 0) this.pageContent = res[0];
          },
          error: (e: any) => { this.showErrorMsg(e); }
        });
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

}
