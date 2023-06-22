import { useEffect, useState } from "react";
import { Box, Button  , useToast} from "@chakra-ui/react";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import PropertyCard from "../components/Home/PropertyCard";
import TestimonialContent from "../components/Home/Testimonial"
import Footer from "../components/Home/Footer"
import fetcher from "../networkClient/"
import { ArrowForwardIcon } from '@chakra-ui/icons'


const Main = () => {
    const [propteries, setProperty] = useState([])
    const [cacheProperty, setcacheProperty] = useState([])
    const [nextToken , setNextToken] = useState(null)
    const [isLoading , setLoading] = useState(false)
    const toast = useToast();
    useEffect(() => {
        try {
            getProperties()
        } catch (e) {
            console.warn(`Something went wrong ${e}`)
        }
    }, [])
    async function getProperties(token = null) {
       let response  = null
        if(token){
            response = await fetcher.get("property/getAll?next="+token)
        }else{
            response = await fetcher.get("property/getAll")
        }
        
        if (!Array.isArray(response?.data)) {
            console.warn(`Something went wrong ${response?.data}`)
            console.warn(response)
            // throw new Error("Error in fetching properties");
        } else {
            setNextToken(response?.nextToken)
            setProperty([...propteries , ...response?.data])
        }
        setLoading(false)
    }
    return (
        <Box display={'flex'} w={"100%"} minH={"100svh"} flexDirection={'column'} >
            <Header />
            <Hero onDataChange={(data) => {
                if (data?.length > 0) {
                    setProperty(data)
                    setcacheProperty(propteries)
                }
            }} />
            <Box mt={5} display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                {propteries.map((item, i) => <PropertyCard item={item} key={i} />)}
            </Box>
            <Box display={"flex"} justifyContent={'flex-end'} mr={8} mb={5} >
                <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'
                onClick={()=>{
                    if(nextToken){
                        setLoading(true)
                        getProperties(nextToken)
                    }else{
                        toast({
                            title : "No More Data To Load",
                            status: 'info',
                            duration: 3000,
                            isClosable: true,
                            description : "We have loaded all the data"
                        })
                    }
                }}
                isLoading={isLoading}
                >
                     Load More
                </Button>
            </Box>
            <TestimonialContent />
            <Footer />
        </Box>);
}

export default Main;