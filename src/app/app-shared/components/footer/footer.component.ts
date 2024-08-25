import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { GlobalConstants } from '../../models/javascriptVariables';
import { FileUploadOption } from 'src/app/shared/models/common.model';
import { ProviderService } from 'src/app/core/services/provider.service';
import { Config } from '../../models/config';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent extends BaseComponent implements OnInit {
  footerConfigModel: any = GlobalConstants.ecomFooterConfigModel;
  imageFileViewOption: FileUploadOption;
  constructor(
    protected providerSvc: ProviderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    try {
      this.setFileViewOption();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  setFileViewOption() {
    try {
      this.imageFileViewOption = new FileUploadOption();
      this.imageFileViewOption.folderName = Config.imageFolders.ecomPageConfig;
    } catch (e) {
      throw e;
    }
  }

  navigateBySlug(slug:string){
    try {
      if (isPlatformBrowser(this.platformId)) {
      if(slug)
      {
        if(slug.includes('http'))
        {
          window.open(slug);
        }
        else{
          this.router.navigate(['/ecom/' + slug]);
        }
      }
    }
    } catch (e) {
      this.showErrorMsg(e);
    }
  }


}
