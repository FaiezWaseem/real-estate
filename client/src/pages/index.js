import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import PropertyCard from "../components/Home/PropertyCard";
import TestimonialContent from "../components/Home/Testimonial"
import Footer from "../components/Home/Footer"
import fetcher from "../networkClient/"
const Main = () => {
    const [propteries, setProperty] = useState([])
    useEffect(() => {
        try {
            getProperties()
        } catch (e) {
            console.warn(`Something went wrong ${e}`)
        }
    }, [])
    async function getProperties() {
        let data = await fetcher.get("property/getAll")
        if (!Array.isArray(data)) {
            console.warn(`Something went wrong ${data}`)
            console.warn(data)
            // throw new Error("Error in fetching properties");
        } else {
            setProperty([...data])
        }
    }
    return (
        <Box display={'flex'} w={"100%"} minH={"100svh"} flexDirection={'column'} >
            <Header />
            <Hero />
            <Box mt={5} display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                {propteries.map(item => <PropertyCard item={item} />)}
            </Box>
            <TestimonialContent />
            <Footer />
        </Box>);
}

export default Main;