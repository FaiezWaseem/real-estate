import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Text,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast
} from '@chakra-ui/react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import fetcher from '../../networkClient';
import Storage from "../../utils/Storage"
export default () => {

  const navigate = useNavigate()
  const [Error, setError] = useState(null)
  const [imageb64, setImageb64] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast();


  useEffect(() => {
    isLogin()
  }, [])
  async function isLogin() {
    const user = await Storage.get('user', Storage.JSON) || null;
    if (user) {
      console.log(user)
      navigate("/")
    }
  }

  const selectProfileImage = () => {
    const input = document.createElement("input")
    input.type = 'file'

    input.onchange = (i) => {
      console.log(i.target.files)
      if (i.target.files && i.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          //  console.log(e.target.result)
          setImageb64(e.target.result)
        };
        reader.readAsDataURL(i.target.files[0]);
        uploadImage(i)
      }
    }
    input.click()
  }
  async function uploadImage(i) {
    const formData = new FormData();
    formData.append('filename', i?.target?.files?.[0]?.name);
    formData.append('image', i.target.files[0]);
    const response = await fetcher.post('upload/image', formData)
    setSelectedImage(response.url)
  }
  async function register() {
    console.log("clicked")
    if (!imageb64) {
      setError("Please Select a Profile Image")
      return
    }
    if (!username || username.length < 4) {
      setError("Username is required |length minimum of 4 ")
      return
    }
    if (!email || !email.includes("@")) {
      setError("Email Address is required || valid email address abc@gmail.com")
      return
    }
    if (!password || password.length < 6) {
      setError("Password is required! | password length minimum of 6")
      return
    }
    setError(null)


    const response = await fetcher.post('auth/register', JSON.stringify({
      username,
      email,
      password,
      profileImg: selectedImage,
    }) , true)
    console.log(response)
    if(response?.token){
      Storage.save('user', response, Storage.JSON)
      toast({
        title: 'Login Success',
        description: "Successfully Signed In",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      navigate("/")
    }else{
      alert("Error "+response)
    }

  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Create
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={imageb64}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<IoIosCloseCircle />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" onClick={selectProfileImage}  >Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired >
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Text m={2} fontFamily={'monospace'} fontWeight={'bold'} fontSize={18} color={'red.600'} >{Error}</Text>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={register}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}