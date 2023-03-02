'use client';
import { useState } from 'react';
import Card from './card';


type Data = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Geo = {
  lat: string;
  lng: string;
};

const MyPage = () => {

  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);

  const clearData = () => {
    setData([]);
    console.log('data cleared')
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      console.log('data fetched')
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-10 mb-10">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={fetchData}>
            Load data
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={clearData}>
            Clear data
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center">
            <ul>
              {data.map((item) => (
                <Card 
                  key={item.id}
                  name={item.name}
                  email={item.email}
                  lat={item.address.geo.lat}
                  lng={item.address.geo.lng}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
