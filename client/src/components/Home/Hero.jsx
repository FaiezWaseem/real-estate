import { Box, Text, Input, Button, Select } from "@chakra-ui/react";
export default () => (
    <Box h={['400px' , '500px' ,'600px']} w={"100%"} backgroundImage={"url('./hero.png')"} display={"flex"} flexDirection={"column"} alignItems={'center'} justifyContent={"center"} >
        <Text bg={"rgba(0,0,0,0.5)"} p={2} mb={4} fontSize={[26 , 32]} color={"#fff"} fontWeight={'bold'} fontFamily={"monospace"} >Find your dream place right here</Text>
        <Box bg={"#fff"} shadow={'md'} roundedBottom={8} w={["90%", "70%", "50%"]} p={2} >
            <Box display={'flex'} alignItems={'center'} justifyContent={"center"} >
                <Input placeholder="Luxury plot" />
                <Button ml={2} >Find</Button>
            </Box>
            <Box bg={"#fff"} shadow={'md'} w={"100%"} display={'flex'} alignItems={'center'} justifyContent={"center"} p={2} >
                <Select placeholder='select One' size='md' mr={1} >
                    <option value='option1'>0-10000</option>
                    <option value='option2'>1000-10000</option>
                    <option value='option3'>100000-1000000</option>
                </Select>
                <Select placeholder='Select Place' size='md' mr={1} >
                    <option value='option1'>Beach</option>
                    <option value='option2'>Village</option>
                    <option value='option3'>Mountain</option>
                </Select>
                <Select placeholder='Select Region' size='md' >
                    <option value='option1'>Europe</option>
                    <option value='option2'>North America</option>
                    <option value='option3'>South America</option>
                    <option value='option3'>Asia</option>
                </Select>
            </Box>
        </Box>

    </Box>
)