import React from 'react';
import { CognitionResults } from './apiAmazon';

type Props = {
  results: CognitionResults;
}

const Display: React.FC<Props> = ({ results }) => {
  return (
    <div>
      <h1>Cognition Results:</h1>
      <ul>
        <li>Alcohol: {results?.numeric?.Alcohol.toString()}</li>
        <li>Drugs: {results?.numeric?.Drugs.toString()}</li>
        <li>Explicit Nudity: {results?.numeric?.ExplicitNudity.toString()}</li>
        <li>Gambling: {results?.numeric?.Gambling.toString()}</li>
        <li>Hate Symbols: {results?.numeric?.HateSymbols.toString()}</li>
        <li>Rude Gestures: {results?.numeric?.RudeGestures.toString()}</li>
        <li>Suggestive: {results?.numeric?.Suggestive.toString()}</li>
        <li>Tobacco: {results?.numeric?.Tabacco.toString()}</li>
        <li>Violence: {results?.numeric?.Violence.toString()}</li>
        <li>Visually Disturbing: {results?.numeric?.VisuallyDisturbing.toString()}</li>
      </ul>
    </div>
  );
};

export default Display;
