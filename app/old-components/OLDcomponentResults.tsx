import React from 'react';
import { CognitionResults } from '../demo-amazon/typesAmazon';

type Props = {
  results: CognitionResults;
}

const DisplayResults: React.FC<Props> = ({ results }) => {
  return (
    <div>
      <h1>Cognition Results:</h1>
      <ul>
        <li>Alcohol: {results.analytics.numeric.Alcohol.toString()}</li>
        <li>Drugs: {results.analytics.numeric?.Drugs.toString()}</li>
        <li>Explicit Nudity: {results?.analytics?.numeric?.['Explicit Nudity'].toString()}</li>
        <li>Gambling: {results?.analytics.numeric?.Gambling.toString()}</li>
        <li>Hate Symbols: {results?.analytics.numeric?.['Hate Symbols'].toString()}</li>
        <li>Rude Gestures: {results?.analytics.numeric?.['Rude Gestures'].toString()}</li>
        <li>Suggestive: {results?.analytics.numeric?.Suggestive.toString()}</li>
        <li>Tobacco: {results?.analytics.numeric?.Tabacco.toString()}</li>
        <li>Violence: {results?.analytics.numeric?.Violence.toString()}</li>
        <li>Visually Disturbing: {results?.analytics.numeric?.['Visually Disturbing'].toString()}</li>
      </ul>
    </div>
  );
};

export default DisplayResults;
