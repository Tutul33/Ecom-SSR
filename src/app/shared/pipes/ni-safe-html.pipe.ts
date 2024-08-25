import { isPlatformBrowser } from '@angular/common';
import { Inject, Pipe, PipeTransform, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'niSafeHtml'})
export class NiSafeHtml implements PipeTransform {
  constructor(private sanitizer:DomSanitizer,@Inject(PLATFORM_ID) private platformId: any){}

  transform(html) {
    if(isPlatformBrowser(this.platformId))
     {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    //  return this.sanitizer.bypassSecurityTrustStyle(html);
    //  return this.sanitizer.bypassSecurityTrustScript(html);
    //  return this.sanitizer.bypassSecurityTrustUrl(html);
    //  return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}