import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useAuthStore from '../../store/authStore'

const SuggestedHeader = () => {

  const {handleLogout, isLoggingOut} = useLogout();
  const authUser = useAuthStore((state)=>state.user)

  if(!authUser) return null;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Link to={`${authUser.username}`}>
          <Flex alignItems={"center"} gap={3}>
              <Avatar src={authUser.profilePicURL}/>
              <Text fontSize={12} fontWeight={"bold"}>
                {authUser.username}
              </Text>
          </Flex>
        </Link>
        <Button size={"xs"} background={"transparent"} _hover={{background:"transparent"}} fontSize={14} fontWeight={"medium"} color={"blue.400"} cursor={"pointer"} onClick={handleLogout} isLoading={isLoggingOut}
        >
            Log out
        </Button>
    </Flex>
  )
}

export default SuggestedHeader
