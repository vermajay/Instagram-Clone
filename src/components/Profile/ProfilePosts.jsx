import { Box, Flex, Grid, GridItem, Skeleton, Text } from '@chakra-ui/react'
import ProfilePost from './ProfilePost'
import useGetUserPosts from '../../hooks/useGetUserPosts'

const ProfilePosts = () => {

    const {isLoading,posts} = useGetUserPosts()

    const noPostsFound = !isLoading && posts.length === 0
    if(noPostsFound) return <NoPostsFound/>

  return (
    <Grid templateColumns={{sm:"repeat(1,1fr)", md:"repeat(3,1fr)"}} gap={1} columnGap={1}>
      
        {isLoading && [0,1,2].map((_,index)=>(
            <GridItem key={index}>
                <Skeleton>
                    <Box h={"300px"}>contents wrapped</Box>
                </Skeleton>
            </GridItem>
        ))}

        {!isLoading && (
            <>
                {posts.map((post)=>(
                    <ProfilePost post={post} key={post.id}/>
                ))}
            </>
        )}

    </Grid>
  )
}

export default ProfilePosts

const NoPostsFound = () => {
    return (
        <Flex textAlign={"center"} flexDir={"column"} mx={"auto"} mt={10}>
            <Text fontSize={"2xl"}>No posts found😕</Text>
        </Flex>
    )
}