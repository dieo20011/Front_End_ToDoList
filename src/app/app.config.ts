import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import * as fnsLocale from 'date-fns/locale';
import { NZ_DATE_LOCALE} from 'ng-zorro-antd/i18n';
import { HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '../core/service/intercreptor.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { apiCallInterceptor } from '../core/interceptor/interceptor';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';

registerLocaleData(en);
registerLocaleData(vi);
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NZ_DATE_LOCALE, useValue: fnsLocale.vi },
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' })
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) =>
            new TranslateHttpLoader(
              http,
              window.location.protocol +
                '//' +
                window.location.host +
                '/assets/i18n/',
              '.json'
            ),
          deps: [HttpClient],
        },
      }),
    ]),
    provideHttpClient(
      withInterceptors([apiCallInterceptor]),
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
  })
  ],
};
