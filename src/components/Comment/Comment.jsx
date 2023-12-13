import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"
import {timeAgo} from '../../utils/timeAgo'
import { Link } from "react-router-dom"

const Comment = ({comment, isProfilePage}) => {

  const {isLoading,userProfile} = useGetUserProfileById(comment.createdBy)
  if(isLoading) return <CommentSkeleton/>

  return ( userProfile &&
    <Flex gap={4}>
        <Link to={`/${userProfile.username}`}>
          <Avatar src={userProfile.profilePicURL} size={"sm"}/>
        </Link>
        <Flex direction={"column"}>
            <Flex gap={2} alignItems={"baseline"}>
                <Link to={`/${userProfile.username}`}>
                  {
                    isProfilePage ? 
                    <Text fontWeight={"bold"} fontSize={12} display={{base:"none", md:"block"}}>
                      {userProfile.username}
                    </Text>
                    :
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  }
                  
                </Link>
                <Text fontSize={14}>{comment.comment}</Text>
            </Flex>
            <Text fontSize={12} color={"gray"}>{timeAgo(comment.createdAt)}</Text>
        </Flex>
    </Flex>
  )
}

export default Comment

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w={10}/>
      <Flex gap={1} flexDir={"column"}>
        <Skeleton h={2} w={100}/>
        <Skeleton h={2} w={50}/>
      </Flex>
    </Flex>
  )
}