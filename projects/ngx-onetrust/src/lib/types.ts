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
  getGeolocationData: () => { country: string };
  setGeoLocation: (e: any, t: any) => {};
  useGeoLocationService: boolean;
}

export interface Locales {
  name: string;
  code: string;
  locales: Array<string>;
}

export interface ConsentEvent extends CustomEvent {
  detail: Array<string>;
}
