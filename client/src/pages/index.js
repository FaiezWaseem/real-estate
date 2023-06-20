import { Box } from "@chakra-ui/react";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import PropertyCard from "../components/Home/PropertyCard";
import TestimonialContent from "../components/Home/Testimonial"
import Footer from "../components/Home/Footer"
const Main = () => {
    return (
        <Box display={'flex'} w={"100%"} minH={"100svh"} flexDirection={'column'} >
            <Header />
            <Hero />
            <Box mt={5} display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
            </Box>
            <TestimonialContent />
            <Footer />
        </Box>);
}

export default Main;