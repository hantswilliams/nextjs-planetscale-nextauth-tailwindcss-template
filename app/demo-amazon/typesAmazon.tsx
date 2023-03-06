
export type CognitionResults = {
    analytics: AnalyticsCogResults
  }

export type AnalyticsCogResults = {
    binary: BinaryCogResults;
    category:CategoryCogResults;
    numeric: NumericCogResults;
    totalConfidence: number;
    serverUUID: String;
    dateProcessed: String;
    }

export type BinaryCogResults = {
    binary: String
  }
  
export type CategoryCogResults = {
    Alcohol: Boolean;
    Drugs: Boolean;
    'Explicit Nudity': Boolean;
    Gambling: Boolean;
    'Hate Symbols': Boolean;
    'Rude Gestures': Boolean;
    Suggestive: Boolean;
    Tabacco: Boolean;
    Violence: Boolean;
    'Visually Disturbing': Boolean;
  }
  
export type NumericCogResults = {
    Alcohol: number;
    Drugs: number;
    'Explicit Nudity': number;
    Gambling: number;
    'Hate Symbols': number;
    'Rude Gestures': number;
    Suggestive: number;
    Tabacco: number;
    Violence: number;
    'Visually Disturbing': number;
  }
