import { APP_INITIALIZER, FactoryProvider, PLATFORM_ID } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { isPlatformBrowser } from '@angular/common';
import { GlobalConstants } from 'src/app/app-shared/models/javascriptVariables';

// Load error messages
function loadErrorMessageList(configService: ConfigService) {
  return async (): Promise<void> => {
    const observable = configService.loadErrorMessageList();
    if (observable) {
      await lastValueFrom(observable);
    } else {
      console.error('loadErrorMessageList: Observable is undefined');
    }
  };
}

// Synchronize Server Date
function setServerDateTime(configService: ConfigService, platformId: Object) {
  return async (): Promise<void> => {
    if (isPlatformBrowser(platformId)) {
      const observable = configService.setServerDateTime();
      if (observable) {
        await lastValueFrom(observable);
        const timer = setInterval(() => {
          if (GlobalConstants.serverDate) {
            GlobalConstants.serverDate.setSeconds(
              GlobalConstants.serverDate.getSeconds() + 1
            );
          }
        }, 1000);
      } else {
        console.error('setServerDateTime: Observable is undefined');
      }
    }
  };
}

// Initialize SignalR connection
function signalRConnection(configService: ConfigService, platformId: Object) {
  return async (): Promise<void> => {
    if (isPlatformBrowser(platformId)) {
      configService.buildSignalRConnection();
    }
  };
}

// Load validation messages
function loadValidationMessage(configService: ConfigService) {
  return async (): Promise<void> => {
    const observable = configService.loadValidationMessage();
    if (observable) {
      await lastValueFrom(observable);
    } else {
      console.error('loadValidationMessage: Observable is undefined');
    }
  };
}

// Load field details based on language code
function loadFieldDetail(configService: ConfigService) {
  return async (): Promise<void> => {
    const observable = configService.getFieldDetail(GlobalConstants.userInfo.languageCode);
    if (observable) {
      await lastValueFrom(observable);
    } else {
      console.error('loadFieldDetail: Observable is undefined');
    }
  };
}

// Factory providers
export const loadFieldTitle: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadFieldDetail,
  deps: [ConfigService],
  multi: true,
};

export const loadValidation: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadValidationMessage,
  deps: [ConfigService],
  multi: true,
};

export const loadErrorMessage: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadErrorMessageList,
  deps: [ConfigService],
  multi: true,
};

export const setServerDate: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: (configService: ConfigService, platformId: Object) => setServerDateTime(configService, platformId),
  deps: [ConfigService, PLATFORM_ID],
  multi: true,
};

export const setSignalRConnection: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: (configService: ConfigService, platformId: Object) => signalRConnection(configService, platformId),
  deps: [ConfigService, PLATFORM_ID],
  multi: true,
};
