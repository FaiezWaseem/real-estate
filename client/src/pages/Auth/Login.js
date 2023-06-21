import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useToast,
  Image,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Storage from '../../utils/Storage';
import { useNavigate } from 'react-router-dom';
import fetcher from '../../networkClient';

export default function () {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const toast = useToast();

  const signInClicked = async () => {
    if (!email || email.length < 8) {
      setError("Please fill Email feild")
      return;
    }
    if (!password || password.length < 4) {
      setError("Please fill Password feild")
      return;
    }
    setError(null)

    const response = await fetcher.post("auth/login", JSON.stringify({ email, password }), true)
    if (response?.token) {
      Storage.save("user", response, Storage.JSON)
      toast({
        title: 'Login Success',
        description: "Successfully Signed In",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      navigate("/")
    } else {
      toast({
        title: 'Failed.',
        description: response,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }

  }
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <Text color={'red.600'} >{error}</Text>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'} onClick={signInClicked} >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            './hero.png'
          }
        />
      </Flex>
    </Stack>
  );
}