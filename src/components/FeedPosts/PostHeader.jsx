import { Avatar, Box, Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../utils/timeAgo'
import useFollowAndUnfollowUser from '../../hooks/useFollowAndUnfollowUser'

const PostHeader = ({post, createrProfile}) => {

  const {handleFollowAndUnfollowUser,isFollowing,isUpdating} = useFollowAndUnfollowUser(post.createdBy)

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${createrProfile.username}`}>
          <Avatar src={createrProfile.profilePicURL} alt={createrProfile.username} size={"sm"}/>
        </Link>
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
            <Link to={`/${createrProfile.username}`}>
              {createrProfile.username}
            </Link>
            <Box color={"gray.500"}>• {timeAgo(post.createdAt)}</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Button fontSize={12} color={"blue.500"} fontWeight={"bold"} _hover={{color:"white"}} transition={"0.2s ease-in-out"}
        size={"xs"}
        bg={"transparent"}
        onClick={handleFollowAndUnfollowUser}
        isLoading={isUpdating}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  )
}

export default PostHeader
