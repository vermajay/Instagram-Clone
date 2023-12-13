import { Flex, Text, VStack } from '@chakra-ui/react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers'
import BuiltBy from '../Copyright/BuiltBy'

const SuggestedUsers = ({isMobileView}) => {
    const {isLoading,suggestedUsers} = useGetSuggestedUsers()
    if(isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
        {!isMobileView && <SuggestedHeader/>}

        {!isMobileView && suggestedUsers.length > 0 && (
            <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                    Suggested for you
                </Text>
            </Flex>
        )}

        {suggestedUsers.map((user)=>(
            <SuggestedUser user={user} key={user.id}/>
        ))}
        
        {!isMobileView && <BuiltBy/>}
    </VStack>
  )
}

export default SuggestedUsers
