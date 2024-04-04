import { Avatar, Box, Button, IconButton, Text, useToast } from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import axios from "axios";




type Data = {
  email: string;
  name: string;
  username: string;
}

const Profile = () => {
    const data = useLoaderData() as Data;
    const navigate = useNavigate();
    const toast = useToast();
    const context = useOutletContext() as Context;
    
  // console.log('CONTEXT:', context)
  console.log("PROFILE DATA: ", data)


  const logOut = () => {
    localStorage.removeItem("token");
    context.toggleLoggedIn();
    navigate("/log-in");
    toast({
      title: "Success",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };


  const deleteAccount = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3005/auth/delete-user",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        localStorage.removeItem("token");
        navigate("/sign-up");
        console.log("RESPONSE: ", response.data);
        toast({
          title: "Success",
          description:
            "Your account has been deleted. We're sorry to see you go!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast({
          title: "Error",
          description: "Failed to delete account. Please try again later!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };





  return (
    <Box>
    <Text textAlign="center" mb={4}>
      Account Details
    </Text>
    <Text textAlign="center">
      Hello, {data.name}! You can manage your account details.
    </Text>
    <Box display="flex" gap={20} w="60%" py={20} m="0 auto">
      {/* User photo */}
      <Box display="flex" alignItems="center">
        <Avatar bg="blue.200" size="2xl" name={data.name} />
      </Box>
      {/* User account details */}
      <Box display="flex" flexDirection="column" w="100%" gap={4}>
          <Box display='flex'>
            <Text w='40%'>Name:</Text>
            <Text>{data.name}</Text>
           
        </Box>        
        <Box display='flex'>
            <Text w='40%'>Email:</Text>
            <Text>{data.email}</Text>
        </Box>
        <Box display='flex'>
            <Text w='40%'>Username:</Text>
            <Text>{data.username}</Text>
          </Box>   
          <Box display='flex'>
            <Text w='40%'>Password:</Text>
            <Text>**********</Text>
        </Box>  
      </Box>
    </Box>
    <Box display="flex" gap={4} justifyContent="center">
      <Button onClick={logOut} size="lg">
        Logout
      </Button>
      <Button onClick={deleteAccount} size="lg">
        Delete Account
      </Button>
    </Box>
  </Box>
  );
};

export default Profile;