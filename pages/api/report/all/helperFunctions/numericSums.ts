export default async function SumsNumeric(PrismaResponse: PrismaResponse) {

        // Initialize an empty object to store the sums
        interface NumericValue {
            [key: string]: number;
          }
          
        interface Cognition {
        outputcleaned: {
            numeric: NumericValue;
        };
        }
          
        interface ResponseItem {
        cognitions: Cognition[];
        }
        
        const response: ResponseItem[][] = [ /* Your response here */ ];
        
        // Initialize an empty object to store the sums
        const categorySums: NumericValue = {};

        // Loop through each item in the response
        PrismaResponse.forEach((items) => {
            items.forEach((item) => {
            item.cognitions.forEach((cognition) => {
                //@ts-expect-error
                console.log(cognition?.outputcleaned?.numeric)
                //@ts-expect-error
                const numeric = cognition?.outputcleaned?.numeric;
                // Loop through each category in the numeric object and add its value to the sum
                for (const category in numeric) {
                    if (categorySums[category]) {
                        categorySums[category] += numeric[category];
                    } else {
                        categorySums[category] = numeric[category];
                    }
                }
            });
            });
        });
  
        // // sort categorySums by value
        // const sortedCategorySums = Object.fromEntries(
        //     Object.entries(categorySums).sort(([,a],[,b]) => b-a)
        // );

        return categorySums

}