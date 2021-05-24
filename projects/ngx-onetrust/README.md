## OneTrust for Angular
OneTrust loader & wrapper for Angular 8+

#### How to use?
1. Install the package  
    `npm i @altack/ngx-onetrust`  
    
     Notice that this library will not add any OneTrust related dependency, OneTrust scripts will be loaded at runtime.

2. Import the `OneTrustModule.forRoot()` in your `AppModule`.
    
    A configuration object with your **domainScriptID** and **cookiesGroups** needs to be set as module configuration.
    CookiesGroups usually looks as follows but their IDs (C0001,C0002, etc. ) might be different.  
    ```javascript
        OneTrustModule.forRoot({
          cookiesGroups: {
            StrictlyNecessaryCookies: 'C0001',
            PerformanceCookies: 'C0002',
            FunctionalCookies: 'C0003',
            TargetingCookies: 'C0004',
            SocialMediaCookies: 'C0005'
          },
          domainScript: 'your-domain-script-id'
        })
    ```  

    Visit your https://app.cookiepro.com/cookies/categorizations?tab=Categories to define the CookiesGroups object properly.  
    
4. Now you can inject the `OneTrustService` (usually during the `APP_INITIALIZER`) to load the OneTrust scripts, change the banner language in realtime and listen for consent changes.
Let's have a look these 3 method in detail.  

    - `oneTrustService.loadOneTrust()` accepts an optional parameter with your `domainScriptID` which will take over the one defined at the module level.
    Calling this method will init the download and initialization of the OneTrust script.
    
    - `oneTrustService.translateBanner(lang)` will try to translate the cookie banner using the lang parameter (e.g `en`, `es`, `pl`, etc.). 
    It works by calling the `OneTrust.changeLanguage()` method from the OneTrust object of the browser. In order for this to work, you'll have to define the translation in the OneTrust administration panel (usually in the Templates section).
    Based on the country the user is, `translateBanner()` will attempt to identify the most accurate user locale and pass it to the `OneTrust.changeLanguage()` Here are some examples:  
    Suppose the user is in Mexico and the user wants to display the banner in Spanish, you call `oneTrustService.translateBanner('es')` then `OneTrust.changeLanguage()` will be called with `es-MX`, this will be possible because Spanish is available in Mexico (it's the official language).  
    User is in Spain, and he wants to display the banner in English, you call `oneTrustService.translateBanner('en')`. As English is not an official language of Spain, `OneTrust.changeLanguage()` will be called with `en`.  
    User is in Poland, and he wants to display the banner in Polish, you call `oneTrustService.translateBanner('pl')`. As Polish is the official language of Poland, `OneTrust.changeLanguage()` will be called with `pl-PL`.  
    User is in Poland, and he wants to display the banner in English, you call `oneTrustService.translateBanner('en')`. As English is not an official language in Poland, `OneTrust.changeLanguage()` will be called with `en`.  
    Again, for the translations to work you must make it available for your banner template in OneTrust administration. You might want to have a look into `utils/locales.ts` for a better understanding of the relationship between languages and locales.
    If you want to skip all the automated locales discovering and use the language you pass to `oneTrustService.translateBanner()` you can pass a second argument `true` to the `oneTrustService.translateBanner('en', true)`.

    - `oneTrustService.consentChanged$()` returns an `Observable<Map<CookiesGroups, boolean>>`. Basically a Map with the permission the user has consent. Useful for running certain logic based on the user selection. Heads up, by default (while the cookie banner is visible and pristine) this `Map` will contain only `StrictlyNecessaryCookies` permission.

    - `oneTrustService.oneTrustInstance$()` returns an `Observable<OneTrust>`. An instance of the `OneTrust` object after it has been loaded.   
    

#### Side notes
A common use case for loading `OneTrust` is by calling `oneTrustService.loadOneTrust()` within the `APP_INITIALIZER`.
```javascript
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [MyInitService],
      multi: true
    }
```

```javascript
export function appInitializer(myInitService: MyInitService): Function {
  return () => myInitService.load();
}
```

```javascript
@Injectable({ providedIn: 'root' })
export class MyInitService {

  constructor(
    ...
    private oneTrust: OneTrustService,
    ...
  ) {}

  public load(): Promise<any> {
  this.oneTrust.loadOneTrust();
  ...
  }
}
```
