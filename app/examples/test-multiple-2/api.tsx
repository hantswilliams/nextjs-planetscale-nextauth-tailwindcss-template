export type Data = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
  };
  
  export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  };
  
  export type Geo = {
    lat: string;
    lng: string;
  };
  
  export const fetchUserData = async (): Promise<Data[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  };
  