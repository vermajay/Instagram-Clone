import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"
import useGetFollowers from "../../hooks/useGetFollowers"
import useUserProfileStore from "../../store/userProfileStore"
import SuggestedUser from "../SuggestedUsers/SuggestedUser"

const Followers = () => {
    const userProfile = useUserProfileStore((state)=>state.userProfile)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isLoading,followerArray} = useGetFollowers()
    if(isLoading) return null;

    if(userProfile.followers.length === 0){
        return (
            <Text fontSize={{base:"sm", md:"lg"}}>
                <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
                Followers
            </Text>
        )
    }

  return (
    <>
        <Button fontSize={{base:"sm", md:"lg"}} bg={"transparent"} p={1} onClick={onOpen}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
            Followers
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
            <ModalOverlay/>
            <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                <ModalCloseButton/>
                <ModalBody>
                    <VStack py={8} px={6} gap={4}>
                        {followerArray.map((user)=>(
                            <SuggestedUser user={user} key={user.id}/>
                        ))}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default Followers
