import { ModuleWithProviders, NgModule } from '@angular/core';
import { OneTrustService } from './services/one-trust.service';
import { OneTrustConfig } from './types';
import { ONE_TRUST_CONFIGURATION } from './one-trust-configuration.token';

@NgModule()
export class OneTrustModule {
  static forRoot(oneTrustConfig: OneTrustConfig): ModuleWithProviders<OneTrustModule> {
    return {
      ngModule: OneTrustModule,
      providers: [
        OneTrustService,
        {
          provide: ONE_TRUST_CONFIGURATION,
          useValue: oneTrustConfig
        }
      ]
    };
  }
}
