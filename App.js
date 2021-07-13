import React from 'react';
import {Text} from 'react-native';
import Swipe from './src/Swipe';

export default function App() {
  return (
    <Swipe
      onSwipe={() => {
        console.log('CABOOOOOOOOOOOOO');
      }}>
      <Text>Teste</Text>
    </Swipe>
  );
}
