import { Card as TremorCard, Title, Text } from '@tremor/react';

type CardProps = {
  name: string;
  email: string;
  lat: string;
  lng: string;
};

const Card = ({ name, email, lat, lng }: CardProps) => {
  return (
    <TremorCard marginTop='mt-4'>
      <Title>{name}</Title>
      <Text>{email}</Text>
      <Text>LAT: {lat}</Text>
      <Text>LNG: {lng}</Text>
    </TremorCard>
  );
};

export default Card;
