import { Box, Text } from "@chakra-ui/react";


export default () => {
    return <Box display={'flex'} flex={1} h={'100svh'} justifyContent={'center'} alignItems={'center'}  >
        <Text color={'red.500'} fontSize={32} fontWeight={'bold'} >404</Text>
        <Text color={'peru'} fontSize={22} ml={8} fontFamily={'monospace'}  >Page Not Found</Text>
    </Box>
}