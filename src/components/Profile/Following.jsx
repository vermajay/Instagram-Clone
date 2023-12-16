import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"
import useGetFollowing from "../../hooks/useGetFollowing"
import useUserProfileStore from "../../store/userProfileStore"
import SuggestedUser from "../SuggestedUsers/SuggestedUser"

const Following = () => {
    const userProfile = useUserProfileStore((state)=>state.userProfile)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isLoading,followingArray} = useGetFollowing()
    if(isLoading) return null;

    if(userProfile.following.length === 0){
        return (
            <Text fontSize={{base:"sm", md:"lg"}}>
                <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>
                Following
            </Text>
        )
    }

  return (
    <>
        <Button fontSize={{base:"sm", md:"lg"}} bg={"transparent"} p={1} onClick={onOpen}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>{followingArray.length}</Text>
            Following
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
            <ModalOverlay/>
            <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                <ModalCloseButton/>
                <ModalBody>
                    <VStack py={8} px={6} gap={4}>
                        {followingArray.map((user)=>(
                            <SuggestedUser user={user} key={user.id}/>
                        ))}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default Following
