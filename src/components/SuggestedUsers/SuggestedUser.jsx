import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import useFollowAndUnfollowUser from '../../hooks/useFollowAndUnfollowUser'
import useAuthStore from '../../store/authStore'
import {Link} from 'react-router-dom'
import { useState } from 'react'

const SuggestedUser = ({user}) => {

    const {handleFollowAndUnfollowUser,isFollowing,isUpdating} = useFollowAndUnfollowUser(user.uid)
    const [followers, setFollowers] = useState(user.followers.length)
    const authUser = useAuthStore(state=>state.user)

    const onFollowAndUnfollowUser = async() => {
        await handleFollowAndUnfollowUser()
        isFollowing ? setFollowers(followers-1) : setFollowers(followers+1)
    }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Link to={`/${user.username}`}>
                <Avatar src={user.profilePicURL} size={"md"}/>
            </Link>
            <VStack spacing={2} alignItems={"flex-start"}>
                <Link to={`/${user.username}`}>
                    <Box fontSize={12} fontWeight={"bold"}>
                        {user.fullName}
                    </Box>
                </Link>
                <Box fontSize={11} color={"gray.500"}>
                    {followers} followers
                </Box>
            </VStack>
        </Flex>
        {authUser.uid !== user.uid && (
            <Button fontSize={13} bg={"transparent"} p={0} h={"max-content"} fontWeight={"medium"} color={"blue.400"} cursor={"pointer"} _hover={{color:"white"}} onClick={onFollowAndUnfollowUser} isLoading={isUpdating}>
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
        )}
    </Flex> 
  )
}

export default SuggestedUser
