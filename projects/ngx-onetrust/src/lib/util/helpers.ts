import { Observable, ReplaySubject, Subscriber } from 'rxjs';
import { debounceTime, filter, map, take } from 'rxjs/operators';
import { OneTrust } from '../types';

declare const window: Window;
export const OneTrust$ = new ReplaySubject<OneTrust>(1);

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
    map((record: MutationRecord) => record.addedNodes.item(0) as Node),
    filter((element: Node) => (element as HTMLElement).getAttribute('id') === 'onetrust-consent-sdk'),
    debounceTime(300),
    // tslint:disable:no-string-literal
    map(() => window['OneTrust'] as OneTrust)
  );
};

export function loadOneTrust(
  domainScript: string,
  src: string = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
): void {
  // Get ready to receive the OneTrust object once loaded
  OneTrustReady$()
    .pipe(take(1))
    .subscribe((oneTrust: OneTrust) => {
      OneTrust$.next(oneTrust);
    });
  // Initialize
  const head = document.getElementsByTagName('head')[0];
  const oneTrustScript = window.document.createElement('script');
  oneTrustScript.id = 'one-trust-script';
  oneTrustScript.src = src;
  oneTrustScript.setAttribute('data-document-language', 'true');
  oneTrustScript.setAttribute('type', 'text/javascript');
  oneTrustScript.setAttribute('charset', 'UTF-8');
  oneTrustScript.setAttribute('data-domain-script', domainScript);
  head.insertBefore(oneTrustScript, head.firstChild);
  const oneTrustFuncScript = window.document.createElement('script');
  oneTrustFuncScript.type = 'text/javascript';
  oneTrustFuncScript.innerHTML = `function OptanonWrapper() { }`;
  head.insertBefore(oneTrustFuncScript, head.firstChild);
}
