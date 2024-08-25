import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';

@Directive({
  selector: '[niFileDownload]'
})
export class NiFileDownloadDirective implements AfterViewInit {
  @Input('niFileDownload') filePath: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  @HostListener('click') onClick() {
    if (isPlatformBrowser(this.platformId)) {
    window.open(this.filePath, '_blank', '');
    }
  }

  ngAfterViewInit(): void {
  }

}
