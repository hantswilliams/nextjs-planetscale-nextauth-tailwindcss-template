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


export default async function SumsCategorical(PrismaResponse: PrismaResponse) {

    interface CategoryValue {
        [key: string]: boolean;
      }
      
      interface Cognition {
        outputcleaned: {
          category: CategoryValue;
        };
      }
      
      interface ResponseItem {
        cognitions: Cognition[];
      }
      
      const response: ResponseItem[][] = [ /* Your response here */ ];
      
      // Initialize an empty object to store the boolean counts
      const categoryCounts: CategoryValue = {};
      
      // Loop through each item in the response
      PrismaResponse.forEach((items) => {
        items.forEach((item) => {
          item.cognitions.forEach((cognition) => {
            //@ts-expect-error
            const category = cognition.outputcleaned.category;
            // console.log(category)
            // Loop through each category in the category object and count its value
            for (const categoryKey in category) {
              if (categoryCounts[categoryKey]) {
                //@ts-expect-error
                categoryCounts[categoryKey] += category[categoryKey] ? 1 : 0;
              } else {
                //@ts-expect-error
                categoryCounts[categoryKey] = category[categoryKey] ? 1 : 0;
              }
            }
          });
        });
      });

    return categoryCounts
      
}
