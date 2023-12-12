import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    <div>
      <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container padding={0} maxW={"container.md"}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                {/* Left hand side image */}
                <Box display={{base:"none", md:"block"}}>
                    <Image src="/auth.png" h={650} alt="Phone Img"/>
                </Box>

                {/* Left hand side image */}
                <VStack spacing={4} align={"stretch"}>
                    <AuthForm/>
                    <Box textAlign={"center"}>
                        Get the app.
                    </Box>
                    <Flex gap={5} justifyContent={"center"}>
                        <Image src="/playstore.png" h={10} alt="Playstore logo"/>
                        <Image src="/microsoft.png" h={10} alt="Microsoft logo"/>
                    </Flex>
                </VStack>
            </Flex>
        </Container>
      </Flex>
    </div>
  );
};

export default AuthPage;
