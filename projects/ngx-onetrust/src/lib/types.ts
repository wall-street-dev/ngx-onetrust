export enum CookiesGroups {
  StrictlyNecessaryCookies = 'StrictlyNecessaryCookies',
  PerformanceCookies = 'PerformanceCookies',
  FunctionalCookies = 'FunctionalCookies',
  TargetingCookies = 'TargetingCookies',
  SocialMediaCookies = 'SocialMediaCookies'
}

export interface OneTrustConfig {
  cookiesGroups: { [key in CookiesGroups]: string };
  domainScript?: string;
  defaultCountry?: string;
  documentBasedLanguage?: boolean;
}

export interface OneTrust {
  AllowAll: () => {};
  BlockGoogleAnalytics: (e: any, t: any) => {};
  Close: (e: any) => {};
  FetchAndDownloadPC: () => {};
  GetDomainData: () => {};
  Init: (e: any) => {};
  InitializeBanner: () => {};
  IsAlertBoxClosed: () => boolean;
  IsAlertBoxClosedAndValid: () => boolean;
  LoadBanner: () => {};
  OnConsentChanged: (e: () => void) => ConsentEvent;
  ReconsentGroups: () => {};
  RejectAll: (e: any) => {};
  SetAlertBoxClosed: (e: any) => {};
  ToggleInfoDisplay: () => {};
  changeLanguage: (lang: string) => {};
  getDataSubjectId: () => {};
  getGeolocationData: () => GeoLocationData;
  setGeoLocation: (e: any, t: any) => {};
  useGeoLocationService: boolean;
}

export interface GeoLocationData {
  country: string;
  state: string;
}

export interface LanguageLocales {
  name: string;
  code: string;
  locales: Array<string>;
}

export interface CountriesLocales {
  name: string;
  code: string;
  locales: Array<string>;
}

export interface ConsentEvent extends CustomEvent {
  detail: Array<string>;
}
