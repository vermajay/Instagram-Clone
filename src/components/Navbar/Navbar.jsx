import { Button, Container, Flex, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Container maxW={"container.lg"} my={4}>
        <Flex w={"full"} justifyContent={{base:"center", sm:"space-between"}} alignItems={"center"}>
            <Link to='/auth'>
                <Image src='/logo.png' h={"70px"} display={{base:"none", sm:"block"}} cursor={"pointer"}/>
            </Link>
            <Flex gap={4}>
                <Link to='/auth'>
                    <Button colorScheme={"blue"} size={"sm"}>
                        Login
                    </Button>
                </Link>
                <Link to='/auth'>
                    <Button variant={"outline"} size={"sm"}>
                        Signup
                    </Button>
                </Link>
            </Flex>
        </Flex>
    </Container>
  )
}

export default Navbar
