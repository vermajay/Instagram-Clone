import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers'

const SuggestedUsers = () => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const {isLoading,suggestedUsers} = useGetSuggestedUsers()

    if(isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader/>

        {suggestedUsers.length > 0 && (
            <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                    Suggested for you
                </Text>
                <Text fontSize={12} fontWeight={"bold"} _hover={{color:"gray.400"}} cursor={"pointer"}>
                    See All
                </Text>
            </Flex>
        )}

        {suggestedUsers.map((user)=>(
            <SuggestedUser user={user} key={user.id}/>
        ))}

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
    </VStack>
  )
}

export default SuggestedUsers
