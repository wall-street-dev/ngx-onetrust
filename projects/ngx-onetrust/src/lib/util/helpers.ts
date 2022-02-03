import { BehaviorSubject, Observable, ReplaySubject, Subscriber } from 'rxjs';
import { debounceTime, filter, map, take } from 'rxjs/operators';
import { CountriesLocales, GeoLocationData, OneTrust } from '../types';
import { countries } from './countries';

declare const window: Window;
export const OneTrust$ = new ReplaySubject<OneTrust>(1);
export const appliedLocale$ = new BehaviorSubject('');

const MutationObserver$ = (
  target: Node,
  config: MutationObserverInit = { childList: true }
): Observable<MutationRecord> => {
  return new Observable((observer: Subscriber<MutationRecord>) => {
    const mutationObserver = new MutationObserver(
      (mutations: MutationRecord[], instance: MutationObserver) => {
        mutations.forEach((mutation: MutationRecord) => {
          observer.next(mutation);
        });
      }
    );
    mutationObserver.observe(target, config);
    return () => {
      mutationObserver.disconnect();
    };
  });
};

const OneTrustReady$ = (): Observable<OneTrust> => {
  return MutationObserver$(document.body).pipe(
    filter((record: MutationRecord) => record.addedNodes.length === 1),
    map((record: MutationRecord) => record.addedNodes.item(0) as HTMLElement),
    filter((element: HTMLElement) => {
      return (
          element &&
          typeof element.getAttribute === 'function' &&
          element.getAttribute('id') === 'onetrust-consent-sdk'
      );
    }),
    debounceTime(300),
    // tslint:disable-next-line:no-string-literal
    map(() => window['OneTrust'] as OneTrust)
  );
};

const getDefaultLocalization = (country: string): string => {
  if (countries.has(country.toLowerCase())) {
    const countriesLocales = countries.get(country.toLowerCase()) as CountriesLocales;
    if (countriesLocales.locales && countriesLocales.locales.length > 0) {
      // apply default locale for the current country
      return countriesLocales.locales[0];
    }
  }
  return '';
};

const initializeOneTrust = (src: string, domainScript: string, documentBasedLang: boolean = true, countryCode: string = ''): void => {
  const head = window.document.getElementsByTagName('head')[0];
  const oneTrustScript = window.document.createElement('script');
  oneTrustScript.id = 'one-trust-script';
  oneTrustScript.src = src;
  if (documentBasedLang) {
    oneTrustScript.setAttribute('data-document-language', 'true');
  }
  oneTrustScript.setAttribute('type', 'text/javascript');
  oneTrustScript.setAttribute('charset', 'UTF-8');
  oneTrustScript.setAttribute('data-domain-script', domainScript);
  head.insertBefore(oneTrustScript, head.firstChild);
  const oneTrustFuncScript = window.document.createElement('script');
  oneTrustFuncScript.type = 'text/javascript';
  oneTrustFuncScript.innerHTML = `function OptanonWrapper() { }`;
  head.appendChild(oneTrustFuncScript);
  if (countryCode) {
    const geoLocationScript = window.document.createElement('script');
    geoLocationScript.type = 'text/javascript';
    geoLocationScript.innerHTML = `var OneTrust = {geolocationResponse: {countryCode: '${countryCode}'}}`;
    head.appendChild(geoLocationScript);
  }
};

export function loadOneTrust(
  domainScript: string,
  defaultCountry?: string,
  documentBasedLanguage?: boolean,
  src: string = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
): void {
  // Get ready to receive the OneTrust object once loaded
  OneTrustReady$()
    .pipe(take(1))
    .subscribe((oneTrust: OneTrust) => {
      OneTrust$.next(oneTrust);
    });
  // Initialize
  if (defaultCountry) {
    appliedLocale$.next(defaultCountry);
    initializeOneTrust(src, domainScript, documentBasedLanguage, defaultCountry);
  } else {
    // tslint:disable-next-line:variable-name
    let __geoLocationData: GeoLocationData;
    // tslint:disable-next-line:no-string-literal
    window['jsonFeed'] = (location: GeoLocationData) => {
      __geoLocationData = location;
    };
    const html = window.document.getElementsByTagName('html')[0];
    const head = window.document.getElementsByTagName('head')[0];
    const localizationScript = window.document.createElement('script');
    localizationScript.src = 'https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location';
    localizationScript.setAttribute('type', 'text/javascript');
    localizationScript.onload = () => {
      if (__geoLocationData) {
        const locale = getDefaultLocalization(__geoLocationData.country);
        if (locale) {
          html.setAttribute('lang', locale);
          appliedLocale$.next(locale);
          initializeOneTrust(src, domainScript, true);
        } else {
          console.warn(`Not valid geolocation`, __geoLocationData);
          initializeOneTrust(src, domainScript, false);
        }
      } else {
        initializeOneTrust(src, domainScript, false);
        console.warn(`Not able to determine geolocation using 'https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location'`);
      }
    };
    head.insertBefore(localizationScript, head.firstChild);
  }

}
