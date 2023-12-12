import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack, Link } from '@chakra-ui/react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../hooks/useGetFeedPosts'
import { useState } from 'react';

const FeedPosts = () => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const {isLoading,posts} = useGetFeedPosts()

  return (
    <Container maxW={"container.sm"} py={10} px={2}>

        {isLoading && [0,1,2].map((_,index)=>(
            <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
                <Flex gap={2}>
                    <SkeletonCircle size={10}/>
                    <VStack gap={2} alignItems={"flex-start"}>
                        <Skeleton h={"10px"} w={"200px"}></Skeleton>
                        <Skeleton h={"10px"} w={"100px"}></Skeleton>
                    </VStack>
                </Flex>
                <Skeleton w={"full"}>
                    <Box h={"400px"}>contents wrapped</Box>
                </Skeleton>
            </VStack>
        ))}

        {!isLoading && posts.length > 0 && posts.map((post)=> <FeedPost key={post.id} post={post}/>)}

        {!isLoading && posts.length === 0 && (
            <>
                <Text fontSize={"md"} color={"red.400"}>
                    Dayuum. Looks like you don't have any friends.
                </Text>
                <Text color={"red.400"}> Stop coding and go make some!! </Text>
            </>
        )}

        <Flex fontSize={12} color={"gray.500"} mt={5} gap={1} display={{base:"block", lg:"none"}} alignItems={"baseline"}>
            <Text display={"inline-block"}>© 2023 Built with{" "}</Text>
            <Box display={"inline-block"}
                transition="transform 0.3s ease-in-out"
                transform={isHovered ? 'scale(2.5)' : 'scale(1)'}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                mx={1}
            >
            ❤️
            </Box>
            <Text display={"inline-block"}>By</Text>
            <Link href='https://www.linkedin.com/in/jay-verma-a24275205' target='_blank' color={"blue.500"} fontSize={14} ml={1}
            display={"inline-block"}>
                Jay Verma
            </Link>
        </Flex>
      
    </Container>
  )
}

export default FeedPosts
