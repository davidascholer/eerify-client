export interface ResponseInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<any>;
}

export interface BookResponseInterface {
  id: number;
  slug: string; //Format = ^[-a-zA-Z0-9_]+$
  name: string;
}

export type Rating = 1 | 2 | 3 | 4 | 5;

// https://developers.google.com/books/docs/v1/reference/volumes
export interface BookResult {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: [string];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: [
      {
        type: string;
        identifier: string;
      }
    ];
    pageCount: number;
    dimensions: {
      height: string;
      width: string;
      thickness: string;
    };
    printType: string;
    mainCategory: string;
    categories: [string];
    averageRating: number;
    ratingsCount: number;
    contentVersion: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  userInfo: {
    review: string;
    readingPosition: string;
    isPurchased: boolean;
    isPreordered: boolean;
    updated: string;
  };
  saleInfo: {
    country: string;
    saleability: string;
    onSaleDate: string;
    isEbook: boolean;
    listPrice: {
      amount: number;
      currencyCode: string;
    };
    retailPrice: {
      amount: number;
      currencyCode: string;
    };
    buyLink: string;
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
      downloadLink: string;
      acsTokenLink: string;
    };
    pdf: {
      isAvailable: boolean;
      downloadLink: string;
      acsTokenLink: string;
    };
    webReaderLink: string;
    accessViewStatus: string;
    downloadAccess: {
      kind: string;
      volumeId: string;
      restricted: boolean;
      deviceAllowed: boolean;
      justAcquired: boolean;
      maxDownloadDevices: number;
      downloadsAcquired: number;
      nonce: string;
      source: string;
      reasonCode: string;
      message: string;
      signature: string;
    };
  };
  searchInfo: {
    textSnippet: string;
  };
}

export type LanguageCode = { country: string; abreviation: LanguageType };
export type LanguageCodes = Array<LanguageCode>;

export type LanguageType =
  | "ab"
  | "aa"
  | "af"
  | "ak"
  | "sq"
  | "am"
  | "ar"
  | "an"
  | "hy"
  | "as"
  | "av"
  | "ae"
  | "ay"
  | "az"
  | "bm"
  | "ba"
  | "eu"
  | "be"
  | "bn"
  | "bi"
  | "bs"
  | "br"
  | "bg"
  | "my"
  | "ca"
  | "ch"
  | "ce"
  | "ny"
  | "zh"
  | "cu"
  | "cv"
  | "kw"
  | "co"
  | "cr"
  | "hr"
  | "cs"
  | "da"
  | "dv"
  | "nl"
  | "dz"
  | "en"
  | "eo"
  | "et"
  | "ee"
  | "fo"
  | "fj"
  | "fi"
  | "fr"
  | "fy"
  | "ff"
  | "gd"
  | "gl"
  | "lg"
  | "ka"
  | "de"
  | "el"
  | "kl"
  | "gn"
  | "gu"
  | "ht"
  | "ha"
  | "he"
  | "hz"
  | "hi"
  | "ho"
  | "hu"
  | "is"
  | "io"
  | "ig"
  | "id"
  | "ia"
  | "ie"
  | "iu"
  | "ik"
  | "ga"
  | "it"
  | "ja"
  | "jv"
  | "kn"
  | "kr"
  | "ks"
  | "kk"
  | "km"
  | "ki"
  | "rw"
  | "ky"
  | "kv"
  | "kg"
  | "ko"
  | "kj"
  | "ku"
  | "lo"
  | "la"
  | "lv"
  | "li"
  | "ln"
  | "lt"
  | "lu"
  | "lb"
  | "mk"
  | "mg"
  | "ms"
  | "ml"
  | "mt"
  | "gv"
  | "mi"
  | "mr"
  | "mh"
  | "mn"
  | "na"
  | "nv"
  | "nd"
  | "nr"
  | "ng"
  | "ne"
  | "no"
  | "nb"
  | "nn"
  | "ii"
  | "oc"
  | "oj"
  | "or"
  | "om"
  | "os"
  | "pi"
  | "ps"
  | "fa"
  | "pl"
  | "pt"
  | "pa"
  | "qu"
  | "ro"
  | "rm"
  | "rn"
  | "ru"
  | "se"
  | "sm"
  | "sg"
  | "sa"
  | "sc"
  | "sr"
  | "sn"
  | "sd"
  | "si"
  | "sk"
  | "sl"
  | "so"
  | "st"
  | "es"
  | "su"
  | "sw"
  | "ss"
  | "sv"
  | "tl"
  | "ty"
  | "tg"
  | "ta"
  | "tt"
  | "te"
  | "th"
  | "bo"
  | "ti"
  | "to"
  | "ts"
  | "tn"
  | "tr"
  | "tk"
  | "tw"
  | "ug"
  | "uk"
  | "ur"
  | "uz"
  | "ve"
  | "vi"
  | "vo"
  | "wa"
  | "cy"
  | "wo"
  | "xh"
  | "yi"
  | "yo"
  | "za"
  | "zu";
