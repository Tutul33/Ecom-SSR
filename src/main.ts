import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import './app/core/models/extensions';
import './app/app-shared/models/fixedIDs';


export function getBaseUrl() {
  return typeof document !=='undefined'? document.getElementsByTagName('base')[0].href:'';
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule, {
  providers: providers
})
  .catch(err => console.log(err));

