import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { Box, Image } from '@chakra-ui/react'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

const FeedPost = ({post}) => {

  const {isLoading, userProfile} = useGetUserProfileById(post.createdBy)
  if(isLoading) return

  return (
    <>
      <PostHeader post={post} createrProfile={userProfile}/>
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt={"Feed Post Image"}/>
      </Box>
      <PostFooter post={post} createrProfile={userProfile}/>
    </>
  )
}

export default FeedPost
