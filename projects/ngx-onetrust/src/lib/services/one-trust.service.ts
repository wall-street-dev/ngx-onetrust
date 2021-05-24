import { Inject, Injectable } from '@angular/core';
import { ONE_TRUST_CONFIGURATION } from '../one-trust-configuration.token';
import { ConsentEvent, CookiesGroups, Locales, OneTrust, OneTrustConfig } from '../types';
import { loadOneTrust, OneTrust$ } from '../util/helpers';
import { locales } from '../util/locales';
import { distinctUntilChanged, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fromEventPattern, Observable, of, Subject } from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

@Injectable()
export class OneTrustService {
  private scriptsLoaded = false;
  private cancelPrev$ = new Subject();
  constructor(@Inject(ONE_TRUST_CONFIGURATION) public config: OneTrustConfig) {}

  loadOneTrust(domainScript?: string): void {
    if (this.scriptsLoaded) {
      console.warn('OneTrust already loaded!');
      return;
    }
    loadOneTrust(domainScript || this.config.domainScript || '');
    this.scriptsLoaded = true;
  }

  translateBanner(langAlpha2: string, force?: boolean): void {
    this.cancelPrev$.next();
    OneTrust$.pipe(takeUntil(this.cancelPrev$)).subscribe((oneTrust: OneTrust) => {
      // No point to translate the Banner if it's already closed
      if (oneTrust.IsAlertBoxClosed()) {
        return;
      }
      langAlpha2 = langAlpha2.toLowerCase();
      if (force) {
        oneTrust.changeLanguage(langAlpha2);
        return;
      }
      // Try with the selected language
      oneTrust.changeLanguage(langAlpha2);
      if (locales.has(langAlpha2)) {
        const lang: Locales = locales.get(langAlpha2) as Locales;
        // Try with the most common locale (the first in the array)
        oneTrust.changeLanguage(lang.locales[0]);
        const geolocation = oneTrust.getGeolocationData();
        if (geolocation && geolocation.country) {
          const targetLocale = `${langAlpha2}-${geolocation.country}`;
          // Try with an accurate locale based on the desired language + user location
          if (lang.locales.includes(targetLocale)) {
            oneTrust.changeLanguage(targetLocale);
          }
        }
      } else {
        console.warn(`Language: ${langAlpha2.toUpperCase()} is not valid`);
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
