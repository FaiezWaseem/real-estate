import React, { useState, useEffect } from 'react';
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    Center,
    AvatarBadge,
    Textarea,
    FormHelperText,
    Stack,
    Avatar,
    IconButton
} from '@chakra-ui/react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Storage from '../../utils/Storage';
import Cache from '../../utils/Cache';
import fetcher from '../../networkClient';

const Form1 = () => {

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    useEffect(() => {
        const _title = Cache.getSessionValue('title', Cache.DEFAULT) || null
        if (_title) {
            setTitle(_title)
        }
        const _desc = Cache.getSessionValue('desc', Cache.DEFAULT) || null
        if (_desc) {
            setDescription(_desc)
        }
    }, [])

    const SaveCache = (type, value) => {
        switch (type) {
            case 'title':
                setTitle(value)
                Cache.setSessionValue('title', value, Cache.DEFAULT)
                break;
            case 'desc':
                setDescription(value)
                Cache.setSessionValue('desc', value, Cache.DEFAULT)
                break;
            default:
                break;
        }
    }


    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Create Listing
            </Heading>
            <Flex>
                <FormControl mr="5%">
                    <FormLabel htmlFor="listing-title" fontWeight={'normal'}>
                        Title
                    </FormLabel>
                    <Input id="listing-title" value={title} onChange={(e) => SaveCache('title', e.target.value)} placeholder="Enter a title for your listing" />
                </FormControl>
            </Flex>
            <FormControl id="description" mt={1}>
                <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}>
                    Description
                </FormLabel>
                <Textarea
                    placeholder="Enter some detail"
                    rows={3}
                    shadow="sm"
                    focusBorderColor="brand.400"
                    fontSize={{
                        sm: 'sm',
                    }}
                    value={description} onChange={(e) => SaveCache('desc', e.target.value)}
                />
                <FormHelperText>
                    Brief description for your Property/Listing.
                </FormHelperText>
            </FormControl>
        </>
    );
};

const Form2 = () => {
    const [beds, setBeds] = React.useState('');
    const [SquareMeters, setSquareMeters] = React.useState('');
    const [continent, setContinent] = React.useState('');
    const [Category, setCategory] = React.useState('');
    const [price, setPrice] = React.useState('');

    useEffect(() => {
        const _beds = Cache.getSessionValue('beds', Cache.DEFAULT) || null
        if (_beds) {
            setBeds(_beds)
        }
        const _SquareMeters = Cache.getSessionValue('SquareMeters', Cache.DEFAULT) || null
        if (_SquareMeters) {
            setSquareMeters(_SquareMeters)
        }
        const _continent = Cache.getSessionValue('continent', Cache.DEFAULT) || null
        if (_continent) {
            setContinent(_continent)
        }
        const _Category = Cache.getSessionValue('Category', Cache.DEFAULT) || null
        if (_Category) {
            setCategory(_Category)
        }
        const _price = Cache.getSessionValue('price', Cache.DEFAULT) || null
        if (_price) {
            setPrice(_price)
        }
    }, [])

    const SaveCache = (type, value) => {
        switch (type) {
            case 'beds':
                setBeds(value)
                Cache.setSessionValue('beds', value, Cache.DEFAULT)
                break;
            case 'SquareMeters':
                setSquareMeters(value)
                Cache.setSessionValue('SquareMeters', value, Cache.DEFAULT)
                break;
            case 'continent':
                setContinent(value)
                Cache.setSessionValue('continent', value, Cache.DEFAULT)
                break;
            case 'Category':
                setCategory(value)
                Cache.setSessionValue('Category', value, Cache.DEFAULT)
                break;
            case 'price':
                setPrice(value)
                Cache.setSessionValue('price', value, Cache.DEFAULT)
                break;
            default:
                console.log(type)
                console.log(value)
                break;
        }
    }
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Property Details
            </Heading>

            <FormControl as={GridItem} colSpan={6}>
                <FormLabel
                    htmlFor="street_address"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    Property Price
                </FormLabel>
                <Input
                    type="number"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    value={price}
                    onChange={(e) => SaveCache("price", e.target.value)}
                />
            </FormControl>
            <FormControl as={GridItem} colSpan={6}>
                <FormLabel
                    htmlFor="street_address"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    Beds
                </FormLabel>
                <Input
                    type="number"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    value={beds}
                    onChange={(e) => SaveCache("beds", e.target.value)}
                />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                <FormLabel
                    htmlFor="city"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    Square meatures
                </FormLabel>
                <Input
                    type="number"
                    name="city"
                    id="city"
                    autoComplete="city"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    value={SquareMeters}
                    onChange={(e) => SaveCache("SquareMeters", e.target.value)}
                />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                    htmlFor="country"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}>
                    Category
                </FormLabel>
                <Select
                    id="country"
                    name="country"
                    autoComplete="country"
                    placeholder="Select option"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    value={Category}
                    onChange={(e) => SaveCache("Category", e.target.value)}
                >
                    <option>village</option>
                    <option>mountain</option>
                    <option>beach</option>
                </Select>
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 3]} mt={2}>
                <FormLabel
                    htmlFor="country"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}>
                    Country/Region
                </FormLabel>
                <Select
                    id="country"
                    name="country"
                    autoComplete="country"
                    placeholder="Select option"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    value={continent}
                    onChange={(e) => SaveCache("continent", e.target.value)}
                >
                    <option>Europe</option>
                    <option>South Asia</option>
                    <option>North Asia</option>
                    <option>North America</option>
                    <option>South America</option>
                    <option>Australia</option>
                </Select>
            </FormControl>
        </>
    );
};

const Form3 = () => {
    const [imageb64, setImageb64] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
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
                    Cache.setSessionValue("image64", e.target.result, Cache.DEFAULT)
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
        const response = await fetcher.post('upload/image',formData , null)
        console.log(response)
        Cache.setSessionValue("imageURL", response.url, Cache.DEFAULT)
        setSelectedImage(response.url)
    }
    useEffect(() => {
        const _image64 = Cache.getSessionValue('image64', Cache.DEFAULT) || null
        if (_image64) {
            setImageb64(_image64)
        }
    }, [])

    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" >
                Final Step
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                <FormControl id="userName">
                    <FormLabel>Property Image</FormLabel>
                    <Stack direction={'column'} spacing={6}>
                        <Center>
                            <Avatar size="xl" src={imageb64} >
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
                            <Button w="40%" onClick={selectProfileImage} >Select Image</Button>
                        </Center>
                    </Stack>
                </FormControl>
            </SimpleGrid>
        </>
    );
};

export default function () {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        isLogin()
    }, [])
    async function isLogin() {

        const user = await Storage.get('user', Storage.JSON) || null;
        if (user) {
            console.log(user)
            setUser(user)
        } else {
            navigate("/")
        }
    }
    const createListing = async () => {
        //create listing here and redirect to dashboard with success message

        const title = Cache.getSessionValue('title', Cache.DEFAULT) || null
        const desc = Cache.getSessionValue('desc', Cache.DEFAULT) || null
        const price = Cache.getSessionValue('price', Cache.DEFAULT) || null
        const img = Cache.getSessionValue('imageURL', Cache.DEFAULT) || null
        const sqmeatures = Cache.getSessionValue('SquareMeters', Cache.DEFAULT) || null
        const beds = Cache.getSessionValue('beds', Cache.DEFAULT) || null
        const continent = Cache.getSessionValue('continent', Cache.DEFAULT) || null
        const type = Cache.getSessionValue('Category', Cache.DEFAULT) || null
       
        const bodyJSON = {
            title,
            desc,
            price,
            img,
            sqmeatures,
            beds,
            continent,
            type,
        }
        const response = await fetcher.post("property/" , JSON.stringify(bodyJSON) , 'Bearer '+user?.token)
        console.log(response)
        if(response?._id){
            toast({
                title: 'Listing created.',
                description: "We've created your Listing for you.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }else{
            toast({
                title: 'Failed.',
                description: response ,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position : 'top'
            });
        }
    }

    return (
        <Box backgroundImage={'url("../../hero.png")'} backgroundSize={'cover'} minH={'100svh'} display={'flex'} justifyContent={'center'} alignItems={"center"}>
            <Box
                minW={['100%', 450, 500]}
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                m="10px auto"
                as="form"
                bg={'#fff'}
            >
                <Progress
                    hasStripe
                    value={progress}
                    mb="5%"
                    mx="5%"
                    isAnimated></Progress>
                {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                    setProgress(progress - 33.33);
                                }}
                                isDisabled={step === 1}
                                colorScheme="blue"
                                variant="solid"
                                w="7rem"
                                mr="5%">
                                Back
                            </Button>
                            <Button
                                w="7rem"
                                isDisabled={step === 3}
                                onClick={() => {
                                    setStep(step + 1);
                                    if (step === 3) {
                                        setProgress(100);
                                    } else {
                                        setProgress(progress + 33.33);
                                    }
                                }}
                                colorScheme="blue"
                                variant="outline">
                                Next
                            </Button>
                        </Flex>
                        {step === 3 ? (
                            <Button
                                w="7rem"
                                colorScheme="red"
                                variant="solid"
                                onClick={createListing}>
                                Submit
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </Box>
    );
}