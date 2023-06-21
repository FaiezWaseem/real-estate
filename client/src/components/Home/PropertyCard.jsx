import { Box, Image, Text, Divider } from "@chakra-ui/react";
import { GiBed } from "react-icons/gi"
import { useNavigate } from 'react-router-dom';

export default ({ item }) => {
    const navigate = useNavigate();
    return (
        <Box onClick={() => navigate(`/listing/${item._id}`, { state: item })} w={["100%", "45%", "25%"]} minW={280} display={'flex'} maxH={450} shadow={'xl'} m={4} flexDirection={'column'} >
            <Image src={item?.img} w={"100%"} maxW={'100%'} maxH={300} />
            <Box p={2} mb={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
                <Text fontWeight={'bold'} color={'facebook.600'} >$ {item.price}</Text>
                <Image src={'https://randomuser.me/api/portraits/med/men/75.jpg'} w={"30px"} h={"30px"} rounded={"50%"} />
            </Box>
            <Box pl={2} pr={1} pb={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
                <Text fontSize={'smaller'} fontFamily={'sans-serif'} display={'flex'} > {item.beds} <GiBed style={{ marginLeft: 5 }} size={18} /></Text>
                <Text fontSize={'smaller'} fontFamily={'sans-serif'} > | {item.sqmeatures} squaremeters</Text>
            </Box>
            <Divider orientation='horizontal' />
            <Box p={2} mb={2}>
                <Text>{item.title}</Text>
            </Box>
        </Box>
    )
}