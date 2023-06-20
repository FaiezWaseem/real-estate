import { Flex } from "@chakra-ui/react";
import Header from "../components/Home/Header";
import ListingCard from "../components/Listing/listingCard";
import Footer from "../components/Home/Footer"
export default ()=>{
    return (
        <Flex direction={'column'}>
         <Header icon={"../GreenLand400.png"} />
         <ListingCard />
         <Footer icon={"../GreenLand400.png"} />
        </Flex>
    )
} 