
export type CognitionResults = {
    analytics: AnalyticsCogResults
  }

export type AnalyticsCogResults = {
    binary: BinaryCogResults;
    category:CategoryCogResults;
    numeric: NumericCogResults;
    totalConfidence: number;
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
    Alcohol: Number;
    Drugs: Number;
    'Explicit Nudity': Number;
    Gambling: Number;
    'Hate Symbols': Number;
    'Rude Gestures': Number;
    Suggestive: Number;
    Tabacco: Number;
    Violence: Number;
    'Visually Disturbing': Number;
  }