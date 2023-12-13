import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { useState } from 'react'

const BuiltBy = () => {

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

  return (
    <Flex fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"} alignItems={"baseline"} gap={1}>
        <Text>© 2023 Built with{" "}</Text>
        <Box 
            transition="transform 0.3s ease-in-out"
            transform={isHovered ? 'scale(2.5)' : 'scale(1)'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
        ❤️
        </Box>
        <Text>By</Text>
        <Link href='https://www.linkedin.com/in/jay-verma-a24275205' target='_blank' color={"blue.500"} fontSize={14}>
            Jay Verma
        </Link>
    </Flex>
  )
}

export default BuiltBy
