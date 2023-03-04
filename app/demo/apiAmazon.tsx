export type CognitionResults = {
    binary: BinaryCogResults;
    category:CategoryCogResults;
    numeric: NumericCogResults;
  }
  
  export type BinaryCogResults = {
    binary: String
  }
  
  export type CategoryCogResults = {
    Alcohol: Boolean;
    Drugs: Boolean;
    ExplicitNudity: Boolean;
    Gambling: Boolean;
    HateSymbols: Boolean;
    RudeGestures: Boolean;
    Suggestive: Boolean;
    Tabacco: Boolean;
    Violence: Boolean;
    VisuallyDisturbing: Boolean;
  }
  
  export type NumericCogResults = {
    Alcohol: Number;
    Drugs: Number;
    ExplicitNudity: Number;
    Gambling: Number;
    HateSymbols: Number;
    RudeGestures: Number;
    Suggestive: Number;
    Tabacco: Number;
    Violence: Number;
    VisuallyDisturbing: Number;
  }
  
  export const uploadImage = async (file: File): Promise<{fields: Record<string, string>, url: string}> => {
    const filename = encodeURIComponent(file.name)
    const res = await fetch(`/api/upload-image?file=${filename}`)
    const data = await res.json()
    const formData = new FormData()
  
    // @ts-ignore
    Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value)
    })
    console.log(data)
  
    const response = await fetch(data.url, {
      method: 'POST',
      body: formData,
    })
    console.log('Data URL: ', data.url + '/' + filename)
  
    return data;
  };
  
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
  