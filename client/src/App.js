import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Router from './navigation/Router';

function App() {
  return (
    <ChakraProvider>
        <Router />
    </ChakraProvider>
  );
}

export default App;
