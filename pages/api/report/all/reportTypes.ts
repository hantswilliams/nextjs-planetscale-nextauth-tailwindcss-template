interface UserOutputCleaned {
    binary: {
        binary: string;
    }
    category: {
        Alcohol: boolean;
        Drugs: boolean;
        'Explicit Nudity': boolean;
        Gambling: boolean;
        'Hate Symbols': boolean;
        'Rude Gestures': boolean;
        Suggestive: boolean;
        Tabacco: boolean;
        Violence: boolean;
        'Visually Disturbing': boolean;
        'Revealing Clothes'?: boolean; // added optional property to match one of the objects in the response
        'Weapon Violence'?: boolean; // added optional property to match one of the objects in the response
    };
    numeric: {
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
        'Weapon Violence'?: number; // added optional property to match one of the objects in the response
    };
    dateProcessed: string;
    totalConfidence: number;
    }

interface Cognition {
    outputcleaned: UserOutputCleaned[];
    }

interface Cognitions {
    userId: string;
    cognitions: Cognition[];
    }

type PrismaResponse = Cognitions[][];