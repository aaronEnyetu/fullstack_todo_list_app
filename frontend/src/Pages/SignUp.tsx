import {Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text} from "@chakra-ui/react"
import axios from "axios"
import { useState } from 'react'


// Data validation
const isInvalidEmail = (email: string) => {
    const emailFormat = /\S+@\S+\.\S+/;
    if (email.match(emailFormat)) {
      return false;
    } else {
      return true;
    }
};
  
const isInvalidPass2 = (pass1: string, pass2: string) => {
    if (pass2 !== pass1) {
        return true
    } else {
        return false
    }
}

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")


    const [submitClickedName, setSubmitClickedName] = useState(false)
    const [submitClickedEmail, setSubmitClickedEmail] = useState(false)
    const [submitClickedUsername, setSubmitClickedUsername] = useState(false)
    const [submitClickedPassword, setSubmitClickedPassword] = useState(false)
    const [submitClickedSecondPassword, setSubmitClickedSecondPassword] = useState(false)


    const isErrorName = name === "" && submitClickedName
    const isErrorEmail = isInvalidEmail(email) && submitClickedEmail
    const isErrorUsername = username === "" && submitClickedUsername
    const isErrorPassword = password === "" && submitClickedPassword
    const isErrorSecondPassword =
        isInvalidPass2(password,secondPassword) && submitClickedSecondPassword
  

    const onChangeName = (e: any) => {
        setSubmitClickedName(false)
        console.log(e.target.value)
        setName(e.target.value)
    }
    const onChangeEmail = (e: any) => {
        setSubmitClickedEmail(false)
        console.log(e.target.value)
        setEmail(e.target.value)
    }
    const onChangeUsername = (e: any) => {
        setSubmitClickedUsername(false)
        console.log(e.target.value)
        setUsername(e.target.value)
    }
    const onChangePassword = (e: any) => {
        setSubmitClickedPassword(false)
        console.log(e.target.value)
        setPassword(e.target.value)
    }
    const onChangeSecondPassword = (e: any) => {
        setSubmitClickedSecondPassword(false)
        console.log(e.target.value)
        setSecondPassword(e.target.value)
    }





    const onSubmit = () => {
        setSubmitClickedName(true)
        setSubmitClickedEmail(true)
        setSubmitClickedUsername(true)
        setSubmitClickedPassword(true)
        setSubmitClickedSecondPassword(true)
    
      
        if (
            name === "" ||
            isInvalidEmail(email)||
            username === "" ||
            password === "" ||
            secondPassword !== password ||
            secondPassword === ""
        ) {
            return
            // console.log("ERROR")
            // console.log(isErrorSecondPassword)
        } else {
            
            axios
                .post("http://localhost:3005/auth/sign-up", {
                name,
                email,
                username,
                password,
            })
                .then((response) => {
                    console.log("RESPONSE", response)
                    setName("")
                    setEmail("")
                    setUsername("")
                    setPassword("")
                    setSecondPassword("")

                    setSubmitClickedName(false)
                    setSubmitClickedEmail(false)
                    setSubmitClickedUsername(false)
                    setSubmitClickedPassword(false)
                    setSubmitClickedSecondPassword(false)
            })
        }
    }
  return (
      <Box>
          <Heading textAlign='center' mb={4} fontSize={20}>
              Create an Account
          </Heading>
          <Box
              maxW='75%'
              display='flex'
              flexDirection='column'
              alignItems='center'
              margin='0 auto'
              gap={4}
          >
        <FormControl isInvalid={isErrorName} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            size="lg"
            value={name}
            onChange={onChangeName}
          />
          {!isErrorName ? null : (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
              </FormControl>
              <FormControl isInvalid={isErrorEmail} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            size="lg"
            value={email}
            onChange={onChangeEmail}
          />
          {!isErrorEmail ? null : (
            <FormErrorMessage>A valid email address is required.</FormErrorMessage>
          )}
              </FormControl>

         <FormControl isInvalid={isErrorUsername} isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            size="lg"
            value={username}
            onChange={onChangeUsername}
          />
          {!isErrorUsername ? null : (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )}
              </FormControl>

        <FormControl isInvalid={isErrorPassword} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            size="lg"
            value={password}
            onChange={onChangePassword}
          />
          {!isErrorUsername ? null : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
              </FormControl>
        
        <FormControl isInvalid={isErrorSecondPassword} isRequired>
          <FormLabel>Enter Password Again</FormLabel>
          <Input
            type="password"
            size="lg"
            value={secondPassword}
            onChange={onChangeSecondPassword}
          />
          {!isErrorUsername ? null : (
            <FormErrorMessage>Passwords must match.</FormErrorMessage>
          )}
        </FormControl>
           
          
             
              <Button onClick={onSubmit}>Submit</Button>
          </Box>
    </Box>
  )
}

export default SignUp