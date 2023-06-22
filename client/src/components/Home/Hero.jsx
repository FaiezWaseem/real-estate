import { Box, Text, Input, Button, Select } from "@chakra-ui/react";
import fetcher from "../../networkClient"
import { useState } from "react";
export default ({ onDataChange }) => {

    const [type, setType] = useState(null);
    const [continent, setContinent] = useState(null);

    return (
        <Box h={['400px', '500px', '600px']} w={"100%"} backgroundImage={"url('./hero.png')"} backgroundAttachment={'fixed'} backgroundSize={'cover'} display={"flex"} flexDirection={"column"} alignItems={'center'} justifyContent={"center"} >
            <Text bg={"rgba(0,0,0,0.5)"} p={2} mb={4} fontSize={[26, 32]} color={"#fff"} fontWeight={'bold'} fontFamily={"monospace"} >Find your dream place right here</Text>
            <Box bg={"#fff"} shadow={'md'} roundedBottom={8} w={["90%", "70%", "50%"]} p={2} >
                <Box display={'flex'} alignItems={'center'} justifyContent={"center"} >
                    <Input placeholder="Luxury plot" />
                    <Button ml={2} onClick={async () => {
                        let property = []
                        if (type && continent) {
                            const response = await fetcher.get('property/find/?type=' + type + "&continent=" + continent)
                            if (response && response?.length > 0) {
                                onDataChange(response)
                            }
                        } else {

                            if (type) {
                                const response = await fetcher.get('property/find/?type=' + type)
                                if (response && response?.length > 0) {
                                    property = [...property, ...response]
                                }
                            }
                            if (continent) {
                                const response = await fetcher.get('property/find/?continent=' + continent)
                                if (response && response?.length > 0) {
                                    property = [...property, ...response]
                                }
                            }
                        }
                        onDataChange(property)
                    }} >Find</Button>
                </Box>
                <Box bg={"#fff"} shadow={'md'} w={"100%"} display={'flex'} alignItems={'center'} justifyContent={"center"} p={2} >
                    <Select placeholder='select One' size='md' mr={1} >
                        <option >1000</option>
                        <option >10000</option>
                        <option >1000000</option>
                    </Select>
                    <Select placeholder='Select Place' onChange={(e) => setType(e.target.value)} size='md' mr={1} >
                        <option value='beach'>Beach</option>
                        <option value='village'>Village</option>
                        <option value='mountain'>Mountain</option>
                    </Select>
                    <Select placeholder='Select Region' size='md' onChange={(e) => setContinent(e.target.value)} on >
                        <option>Europe</option>
                        <option>South Asia</option>
                        <option>North Asia</option>
                        <option>North America</option>
                        <option>South America</option>
                        <option>Australia</option>
                    </Select>
                </Box>
            </Box>

        </Box>
    )
}