import { Locales } from '../types';
/*
 * What is this file?
 * A hash of languages with official locales (e.g countries where they are spoken)
 *
 * */

// tslint:disable-next-line:variable-name
const _locales = {
  aa: {
    name: 'Afar',
    code: 'aa',
    locales: ['aa-DJ', 'aa-ER', 'aa-ET']
  },
  af: {
    name: 'Afrikaans',
    code: 'af',
    locales: ['af-ZA']
  },
  sq: {
    name: 'Albanian',
    code: 'sq',
    locales: ['sq-AL']
  },
  am: {
    name: 'Amharic',
    code: 'am',
    locales: ['am-ET']
  },
  ar: {
    name: 'Arabic',
    code: 'ar',
    locales: [
      'ar-SA',
      'ar-AE',
      'ar-BH',
      'ar-DZ',
      'ar-EG',
      'ar-IN',
      'ar-IQ',
      'ar-JO',
      'ar-KW',
      'ar-LB',
      'ar-LY',
      'ar-MA',
      'ar-OM',
      'ar-QA',
      'ar-SD',
      'ar-SY',
      'ar-TN',
      'ar-YE'
    ]
  },
  an: {
    name: 'Aragonese',
    code: 'an',
    locales: ['an-ES']
  },
  hy: {
    name: 'Armenian',
    code: 'hy',
    locales: ['hy-AM']
  },
  as: {
    name: 'Assamese',
    code: 'as',
    locales: ['as-IN']
  },
  az: {
    name: 'Azerbaijani',
    code: 'az',
    locales: ['az-AZ']
  },
  eu: {
    name: 'Basque',
    code: 'eu',
    locales: ['eu-ES', 'eu-FR']
  },
  be: {
    name: 'Belarusian',
    code: 'be',
    locales: ['be-BY']
  },
  bn: {
    name: 'Bengali',
    code: 'bn',
    locales: ['bn-BD', 'bn-IN']
  },
  bs: {
    name: 'Bosnian',
    code: 'bs',
    locales: ['bs-BA']
  },
  br: {
    name: 'Breton',
    code: 'br',
    locales: ['br-FR']
  },
  bg: {
    name: 'Bulgarian',
    code: 'bg',
    locales: ['bg-BG']
  },
  my: {
    name: 'Burmese',
    code: 'my',
    locales: ['my-MM']
  },
  ca: {
    name: 'Catalan',
    code: 'ca',
    locales: ['ca-AD']
  },
  zh: {
    name: 'Chinese',
    code: 'zh',
    locales: ['zh-CN', 'zh-HK', 'zh-SG', 'zh-TW']
  },
  kw: {
    name: 'Cornish',
    code: 'kw',
    locales: ['kw-GB']
  },
  hr: {
    name: 'Croatian',
    code: 'hr',
    locales: ['hr-HR']
  },
  cs: {
    name: 'Czech',
    code: 'cs',
    locales: ['cs-CZ']
  },
  da: {
    name: 'Danish',
    code: 'da',
    locales: ['da-DK']
  },
  dv: {
    name: 'Divehi',
    code: 'dv',
    locales: ['dv-MV']
  },
  nl: {
    name: 'Dutch',
    code: 'nl',
    locales: ['nl-NL', 'nl-AW', 'nl-BE']
  },
  dz: {
    name: 'Dzongkha (Bhutani)',
    code: 'dz',
    locales: ['dz-BT']
  },
  en: {
    name: 'English',
    code: 'en',
    locales: [
      'en-US',
      'en-AG',
      'en-AU',
      'en-BW',
      'en-CA',
      'en-DK',
      'en-GB',
      'en-HK',
      'en-IE',
      'en-IN',
      'en-NG',
      'en-NZ',
      'en-PH',
      'en-SG',
      'en-ZA',
      'en-ZW',
      'en-SC',
      'en-SL',
      'en-ZM',
      'en-FJ'
    ]
  },
  et: {
    name: 'Estonian',
    code: 'et',
    locales: ['et-EE']
  },
  fo: {
    name: 'Faroese',
    code: 'fo',
    locales: ['fo-FO']
  },
  fj: {
    name: 'Fijian',
    code: 'fj',
    locales: ['fj-FJ']
  },
  fi: {
    name: 'Finnish',
    code: 'fi',
    locales: ['fi-FI']
  },
  fr: {
    name: 'French',
    code: 'fr',
    locales: [
      'fr-FR',
      'fr-BE',
      'fr-CA',
      'fr-CH',
      'fr-LU',
      'fr-BF',
      'fr-BJ',
      'fr-CD',
      'fr-GN',
      'fr-ML'
    ]
  },
  gl: {
    name: 'Galician',
    code: 'gl',
    locales: ['gl-ES']
  },
  gd: {
    name: 'Gaelic (Scottish)',
    code: 'gd',
    locales: ['gd-GB']
  },
  gv: {
    name: 'Gaelic (Manx)',
    code: 'gv',
    locales: ['gv-GB']
  },
  ka: {
    name: 'Georgian',
    code: 'ka',
    locales: ['ka-GE']
  },
  de: {
    name: 'German',
    code: 'de',
    locales: ['de-AT', 'de-BE', 'de-CH', 'de-DE', 'de-LI', 'de-LU']
  },
  el: {
    name: 'Greek',
    code: 'el',
    locales: ['el-CY', 'el-GR']
  },
  kl: {
    name: 'Kalaallisut',
    code: 'kl',
    locales: ['kl-GL']
  },
  gu: {
    name: 'Gujarati',
    code: 'gu',
    locales: ['gu-IN']
  },
  ht: {
    name: 'Haitian',
    code: 'ht',
    locales: ['ht-HT']
  },
  ha: {
    name: 'Hausa',
    code: 'ha',
    locales: ['ha-NG']
  },
  he: {
    name: 'Hebrew',
    code: 'he',
    locales: ['he-IL']
  },
  hi: {
    name: 'Hindi',
    code: 'hi',
    locales: ['hi-IN']
  },
  hu: {
    name: 'Hungarian',
    code: 'hu',
    locales: ['hu-HU']
  },
  is: {
    name: 'Icelandic',
    code: 'is',
    locales: ['is-IS']
  },
  ig: {
    name: 'Igbo',
    code: 'ig',
    locales: ['ig-NG']
  },
  id: {
    name: 'Indonesian',
    code: 'id',
    locales: ['id-ID']
  },
  iu: {
    name: 'Inuktitut',
    code: 'iu',
    locales: ['iu-CA']
  },
  ik: {
    name: 'Inupiak',
    code: 'ik',
    locales: ['ik-CA']
  },
  ga: {
    name: 'Irish',
    code: 'ga',
    locales: ['ga-IE']
  },
  it: {
    name: 'Italian',
    code: 'it',
    locales: ['it-CH', 'it-IT']
  },
  ja: {
    name: 'Japanese',
    code: 'ja',
    locales: ['ja-JP']
  },
  kn: {
    name: 'Kannada',
    code: 'kn',
    locales: ['kn-IN']
  },
  ks: {
    name: 'Kashmiri',
    code: 'ks',
    locales: ['ks-IN']
  },
  kk: {
    name: 'Kazakh',
    code: 'kk',
    locales: ['kk-KZ']
  },
  km: {
    name: 'Khmer',
    code: 'km',
    locales: ['km-KH']
  },
  rw: {
    name: 'Kinyarwanda (Rwanda)',
    code: 'rw',
    locales: ['rw-RW']
  },
  rn: {
    name: 'Kirundi',
    code: 'rn',
    locales: ['rn-BI']
  },
  ky: {
    name: 'Kyrgyz',
    code: 'ky',
    locales: ['ky-KG']
  },
  ko: {
    name: 'Korean',
    code: 'ko',
    locales: ['ko-KR', 'ko-KP']
  },
  ku: {
    name: 'Kurdish',
    code: 'ku',
    locales: ['ku-TR']
  },
  lo: {
    name: 'Laothian',
    code: 'lo',
    locales: ['lo-LA']
  },
  lv: {
    name: 'Latvian',
    code: 'lv',
    locales: ['lv-LV']
  },
  lt: {
    name: 'Lithuanian',
    code: 'lt',
    locales: ['lt-LT']
  },
  lg: {
    name: 'Ganda',
    code: 'lg',
    locales: ['lg-UG']
  },
  lb: {
    name: 'Luxembourgish',
    code: 'lb',
    locales: ['lb-LU']
  },
  mk: {
    name: 'Macedonian',
    code: 'mk',
    locales: ['mk-MK']
  },
  mg: {
    name: 'Malagasy',
    code: 'mg',
    locales: ['mg-MG']
  },
  ms: {
    name: 'Malay',
    code: 'ms',
    locales: ['ms-MY']
  },
  ml: {
    name: 'Malayalam',
    code: 'ml',
    locales: ['ml-IN']
  },
  mt: {
    name: 'Maltese',
    code: 'mt',
    locales: ['mt-MT']
  },
  mi: {
    name: 'Maori',
    code: 'mi',
    locales: ['mi-NZ']
  },
  mr: {
    name: 'Marathi',
    code: 'mr',
    locales: ['mr-IN']
  },
  mn: {
    name: 'Mongolian',
    code: 'mn',
    locales: ['mn-MN']
  },
  na: {
    name: 'Nauru',
    code: 'na',
    locales: ['na-NR']
  },
  nd: {
    name: 'Northern Ndebele',
    code: 'nd',
    locales: ['nd-ZW']
  },
  ne: {
    name: 'Nepali',
    code: 'ne',
    locales: ['ne-NP']
  },
  no: {
    name: 'Norwegian',
    code: 'no',
    locales: ['no-NO']
  },
  nb: {
    name: 'Norwegian bokmål',
    code: 'nb',
    locales: ['nb-NO']
  },
  nn: {
    name: 'Norwegian nynorsk',
    code: 'nn',
    locales: ['nn-NO']
  },
  oc: {
    name: 'Occitan',
    code: 'oc',
    locales: ['oc-FR']
  },
  or: {
    name: 'Oriya',
    code: 'or',
    locales: ['or-IN']
  },
  om: {
    name: 'Oromo',
    code: 'om',
    locales: ['om-ET', 'om-KE']
  },
  ps: {
    name: 'Pashto',
    code: 'ps',
    locales: ['ps-AF']
  },
  fa: {
    name: 'Persian (Farsi)',
    code: 'fa',
    locales: ['fa-IR']
  },
  pl: {
    name: 'Polish',
    code: 'pl',
    locales: ['pl-PL']
  },
  pt: {
    name: 'Portuguese',
    code: 'pt',
    locales: ['pt-PT', 'pt-BR', 'pt-AO']
  },
  pa: {
    name: 'Punjabi (Eastern)',
    code: 'pa',
    locales: ['pa-IN', 'pa-PK']
  },
  ro: {
    name: 'Romanian',
    code: 'ro',
    locales: ['ro-RO']
  },
  ru: {
    name: 'Russian',
    code: 'ru',
    locales: ['ru-RU', 'ru-UA']
  },
  sm: {
    name: 'Samoan',
    code: 'sm',
    locales: ['sm-WS']
  },
  sg: {
    name: 'Sango',
    code: 'sg',
    locales: ['sg-CF']
  },
  sa: {
    name: 'Sanskrit',
    code: 'sa',
    locales: ['sa-IN']
  },
  sr: {
    name: 'Serbian',
    code: 'sr',
    locales: ['sr-CS', 'sr-ME', 'sr-RS', 'sr-YU']
  },
  st: {
    name: 'Sesotho',
    code: 'st',
    locales: ['st-ZA']
  },
  tn: {
    name: 'Setswana',
    code: 'tn',
    locales: ['tn-ZA']
  },
  sd: {
    name: 'Sindhi',
    code: 'tn',
    locales: ['sd-IN']
  },
  ss: {
    name: 'Siswati',
    code: 'ss',
    locales: ['ss-ZA']
  },
  sk: {
    name: 'Slovak',
    code: 'sk',
    locales: ['sk-SK']
  },
  sl: {
    name: 'Slovenian',
    code: 'sl',
    locales: ['sl-SI']
  },
  so: {
    name: 'Somali',
    code: 'so',
    locales: ['so-SO', 'so-DJ', 'so-ET', 'so-KE']
  },
  nr: {
    name: 'Southern Ndebele',
    code: 'so',
    locales: ['nr-ZA']
  },
  es: {
    name: 'Spanish',
    code: 'es',
    locales: [
      'es-ES',
      'es-AR',
      'es-BO',
      'es-CL',
      'es-CO',
      'es-CR',
      'es-DO',
      'es-CU',
      'es-EC',
      'es-GT',
      'es-HN',
      'es-MX',
      'es-NI',
      'es-PA',
      'es-PE',
      'es-PR',
      'es-PY',
      'es-SV',
      'es-US',
      'es-UY',
      'es-VE'
    ]
  },
  sw: {
    name: 'Swahili (Kiswahili)',
    code: 'sw',
    locales: ['sw-KE', 'sw-TZ']
  },
  sv: {
    name: 'Swedish',
    code: 'sv',
    locales: ['sv-FI']
  },
  tl: {
    name: 'Tagalog',
    code: 'tl',
    locales: ['tl-PH']
  },
  tg: {
    name: 'Tajik',
    code: 'tg',
    locales: ['tg-TJ']
  },
  ta: {
    name: 'Tamil',
    code: 'ta',
    locales: ['ta-IN']
  },
  tt: {
    name: 'Tatar',
    code: 'ta',
    locales: ['tt-RU']
  },
  th: {
    name: 'Thai',
    code: 'th',
    locales: ['th-TH']
  },
  bo: {
    name: 'Tibetan',
    code: 'bo',
    locales: ['bo-CN', 'bo-IN']
  },
  ti: {
    name: 'Tigrinya',
    code: 'ti',
    locales: ['ti-ER', 'ti-ET']
  },
  to: {
    name: 'Tonga',
    code: 'to',
    locales: ['to-TO', 'to-TO']
  },
  ts: {
    name: 'Tsonga',
    code: 'ts',
    locales: ['ts-ZA']
  },
  tr: {
    name: 'Turkish',
    code: 'tr',
    locales: ['tr-CY', 'tr-TR']
  },
  tk: {
    name: 'Turkmen',
    code: 'tk',
    locales: ['tk-TM']
  },
  uk: {
    name: 'Ukrainian',
    code: 'uk',
    locales: ['uk-UA']
  },
  ur: {
    name: 'Urdu',
    code: 'ur',
    locales: ['ur-PK']
  },
  uz: {
    name: 'Uzbek',
    code: 'uz',
    locales: ['uz-UZ']
  },
  ve: {
    name: 'Venda',
    code: 've',
    locales: ['ve-ZA']
  },
  vi: {
    name: 'Vietnamese',
    code: 'vi',
    locales: ['vi-VN']
  },
  cy: {
    name: 'Welsh',
    code: 'cy',
    locales: ['cy-GB']
  },
  wo: {
    name: 'Wolof',
    code: 'wo',
    locales: ['wo-SN']
  },
  fy: {
    name: 'Western Frisian',
    code: 'fy',
    locales: ['fy-DE', 'fy-NL']
  },
  xh: {
    name: 'Xhosa',
    code: 'xh',
    locales: ['xh-ZA']
  },
  yi: {
    name: 'Yiddish',
    code: 'yi',
    locales: ['yi-US']
  },
  yo: {
    name: 'Yoruba',
    code: 'yo',
    locales: ['yo-NG']
  },
  zu: {
    name: 'Zulu',
    code: 'zu',
    locales: ['zu-ZA']
  }
};

export const locales = new Map<string, Locales>(
    Object.keys(_locales).map((k: string) => [k, _locales[k]])
) as ReadonlyMap<string, Locales>;
