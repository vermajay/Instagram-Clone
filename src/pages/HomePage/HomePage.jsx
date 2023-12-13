import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import FeedPosts from '../../components/FeedPosts/FeedPosts'
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers'

const HomePage = () => {
  return (
    <div>
      <Container maxW={"container.lg"}>
        <Flex gap={20}>
          <Box flex={2} py={{base:"7", lg:"10"}}>
            <FeedPosts/>
          </Box>
          <Box flex={3} py={10} maxW={"300px"} mr={20} display={{base:"none", lg:"block"}}>
            <SuggestedUsers/>
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

export default HomePage
