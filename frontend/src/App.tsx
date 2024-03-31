
import {  ChakraProvider } from '@chakra-ui/react';
import { Outlet, useLoaderData } from 'react-router-dom'
import Header from './Components/Header'
import { useState } from 'react';


type Data = {
  name: string;
  email: string;
  username: string;
};

export type Context = {
  loggedIn: boolean;
  toggleLoggedIn: () => void;
};



function App() {

  const data = useLoaderData() as Data | undefined;
  const [loggedIn, setLoggedIn] = useState(data?.username !== undefined);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  const context: Context = {
    loggedIn,
    toggleLoggedIn,
  };

  console.log("LOGGED IN: ", loggedIn);
  
  return (
    <ChakraProvider>
      <Header />
      <Outlet/>
   </ChakraProvider>
  );
}

export default App;
