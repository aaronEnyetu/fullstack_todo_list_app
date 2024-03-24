import React, { useState } from 'react';
import './App.css';
import { Box, Button, ChakraProvider, Input } from '@chakra-ui/react';
import axios from 'axios'

function App() {
  const [firstName, setFirstName] = useState("Aaron");
  const [lastName, setLastName] = useState("Enyetu");

  const onChangeFirstName = (event: any) => {
    // console.log("EVENT: ", event.target.value)    
    setFirstName(event.target.value)
  }

  const onChangeLastName = (event: any) => {
    // console.log("EVENT: ", event.target.value)    
    setLastName(event.target.value)
  }

  const handleClick = async () => {
    const response = await axios.post('http://localhost:3005/name', {
       firstName,
       lastName,
    })
    console.log("RESPONSE", response.data)
  }
  return (
    <ChakraProvider>
      <Box m={10} display="flex" gap={4}>
        <Input onChange={onChangeFirstName} placeholder="Type in your first name..." />
        <Input onChange={onChangeLastName} placeholder="Type in your last name..."/>
        <Button colorScheme='purple' onClick={handleClick}>
          Add
        </Button>
      </Box>
   </ChakraProvider>
  );
}

export default App;
