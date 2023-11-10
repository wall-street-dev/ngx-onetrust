import { Inject, Injectable } from '@angular/core';
import { ONE_TRUST_CONFIGURATION } from '../one-trust-configuration.token';
import { ConsentEvent, CookiesGroups, CountriesLocales, OneTrust, OneTrustConfig } from '../types';
import {appliedLocale$, loadOneTrust, OneTrust$} from '../util/helpers';
import { distinctUntilChanged, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { fromEventPattern, Observable, Subject } from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

@Injectable()
export class OneTrustService {
  private scriptsLoaded = false;
  private cancelPrev$ = new Subject<void>();
  constructor(@Inject(ONE_TRUST_CONFIGURATION) public config: OneTrustConfig) {}

  loadOneTrust(domainScript?: string): void {
    if (this.scriptsLoaded) {
      console.warn('OneTrust already loaded!');
      return;
    }
    // tslint:disable-next-line:max-line-length
    loadOneTrust(domainScript || this.config.domainScript || '', this.config.defaultCountry || '', this.config.documentBasedLanguage || true);
    this.scriptsLoaded = true;
  }

  translateBanner(langAlpha2: string, force?: boolean): void {
    this.cancelPrev$.next();
    OneTrust$.pipe(takeUntil(this.cancelPrev$)).subscribe((oneTrust: OneTrust) => {
      langAlpha2 = langAlpha2.toLowerCase();
      if (force || langAlpha2.length > 2) {
        if (appliedLocale$.getValue() !== langAlpha2) {
          appliedLocale$.next(langAlpha2);
          oneTrust.changeLanguage(langAlpha2);
          return;
        }
      }
      // builds a valid xx-YY in order to try to translate the banner using the resulting locale (e.g en-US)
      const geolocation = oneTrust.getGeolocationData();
      if (geolocation && geolocation.country) {
        const targetLocale = `${langAlpha2}-${geolocation.country}`;
        if (appliedLocale$.getValue() !== targetLocale) {
          appliedLocale$.next(targetLocale);
          oneTrust.changeLanguage(targetLocale);
        }
      }
    });
  }

  oneTrustInstance$(): Observable<OneTrust> {
    return OneTrust$;
  }

  consentChanged$(): Observable<Map<CookiesGroups, boolean>> {
    return OneTrust$.pipe(
        switchMap((oneTrust: OneTrust) => this.fromConsentChanged(oneTrust)),
        map((groups: Array<string>) => this.cookiesPermissionMap(groups)),
        distinctUntilChanged(
            (prev: Map<CookiesGroups, boolean>, next: Map<CookiesGroups, boolean>) => {
              return this.areMapsEquals(prev, next);
            }
        )
    );
  }

  private oneTrustActiveGroups(): Array<string> {
    // tslint:disable:no-string-literal
    // @ts-ignore
    return (window['OnetrustActiveGroups'] as string).split(',').filter(Boolean);
  }

  private fromConsentChanged(oneTrustInstance: OneTrust): Observable<Array<string>> {
    return (
        fromEventPattern(
            (handler: NodeEventHandler) => oneTrustInstance.OnConsentChanged(handler) as ConsentEvent
        ) as Observable<ConsentEvent>
    ).pipe(
        map((event: ConsentEvent) => event.detail),
        startWith(this.oneTrustActiveGroups())
    );
  }

  private cookiesPermissionMap(foundCookies: Array<string>): Map<CookiesGroups, boolean> {
    const cookiesGroups = new Map<CookiesGroups, boolean>();
    // maps found cookies to real cookies groups
    Object.keys(this.config.cookiesGroups).forEach((key: string) => {
      // casting is possible because the way the CookiesGroups enum was declared (e.g StrictlyNecessaryCookies = 'StrictlyNecessaryCookies')
      const cookieValue = this.config.cookiesGroups[key as CookiesGroups];
      if (foundCookies.includes(cookieValue)) {
        cookiesGroups.set(key as CookiesGroups, true);
      }
    });
    return cookiesGroups;
  }

  private areMapsEquals(
      prev: Map<CookiesGroups, boolean>,
      next: Map<CookiesGroups, boolean>
  ): boolean {
    // different sizes means something changed
    if (prev.size !== next.size) {
      return false;
    }
    // check if keys from next are the same as keys from prev
    return [...next.keys()].every((key: CookiesGroups) => prev.has(key));
  }
}
