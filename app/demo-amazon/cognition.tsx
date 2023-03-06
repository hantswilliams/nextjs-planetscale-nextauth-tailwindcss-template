import { CognitionResults } from './typesAmazon';
    
export const fetchCognitionResults = async (url: string): Promise<CognitionResults> => {
    const response = await fetch('http://localhost:5005/cognition/amazon/moderation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url }),
    })
    const result = await response.json()
    console.log('Cognition Result: ', result)
    return result;
  };
  