import { Component, Input, OnInit } from '@angular/core';
import {
  BaseComponent, Config, FileUploadOption, FixedIDs, ProviderService
} from '../index';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent extends BaseComponent {
  responsiveOptionsBanner: any = [
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  @Input() visibilityTypeCd:number = 0;
  @Input() bannerList:any[] = [];
  visibilityType:any = FixedIDs.visibilityType;
  constructor(
    protected providerSvc: ProviderService,
  ) {
    super(providerSvc);
  }
  navigateByCategorySlug(slug:string){
    try {
      if(slug)
      {
        if(slug.includes('http'))
        {
          window.open(slug);
        }
        else{
          this.router.navigate(['/banner-item-display/' + slug]);
        }
      }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

}
