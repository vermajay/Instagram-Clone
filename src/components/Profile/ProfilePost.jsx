import { Avatar, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react'
import {AiFillHeart} from 'react-icons/ai'
import {FaComment} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import Comment from '../Comment/Comment'
import PostFooter from '../FeedPosts/PostFooter'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore'
import useShowToast from '../../hooks/useShowToast'
import { useState } from 'react'
import usePostStore from '../../store/postStore'
import { deleteObject, ref } from 'firebase/storage'
import { firestore, storage } from '../../Firebase/firebase'
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import {Link} from 'react-router-dom'
import Caption from '../Comment/Caption'

const ProfilePost = ({post}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {userProfile} = useUserProfileStore()
    const authUser = useAuthStore(state=>state.user)
    const showToast = useShowToast()
    const [isDeleting, setIsDeleting] = useState(false)
    const deletePost = usePostStore(state=>state.deletePost)
    const decrementPostsCount = useUserProfileStore(state=>state.deletePost)

    const handleDeletePost = async() => {
        if(!window.confirm('Are you sure you want to delete this post?')) return

        try {
            setIsDeleting(true)

            //delete the image
            const imageRef = ref(storage, `posts/${post.id}`)
            await deleteObject(imageRef)

            //delete the post
            await deleteDoc(doc(firestore, "posts", post.id))

            //delete postId from user doc
            const userRef = doc(firestore, "users", userProfile.uid)
            await updateDoc(userRef, {posts: arrayRemove(post.id)})

            //update UI
            deletePost(post.id)
            decrementPostsCount(post.id)

            showToast("Success", "Post deleted successfully", "success")
            
        } catch (error) {
            showToast("Error", error.message, "error");
        }finally{
            setIsDeleting(false);
        }
    }

  return (
    <>
        <GridItem cursor={"pointer"} borderRadius={4} overflow={"hidden"} border={"1px solid whiteAlpha.300"} position={"relative"}
        aspectRatio={"1/1"} onClick={onOpen}>

            {/* overlay */}
            <Flex opacity={0} _hover={{opacity:1}} position={"absolute"} top={0} right={0} bottom={0} left={0} bg={"blackAlpha.700"}
            transition={"all 0.3s ease"} zIndex={1} justifyContent={"center"}>

                <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
                    <Flex>
                        <AiFillHeart size={20}/>
                        <Text fontWeight={"bold"} ml={2}>{post.likes.length}</Text>
                    </Flex>
                    <Flex>
                        <FaComment size={20}/>
                        <Text fontWeight={"bold"} ml={2}>{post.comments.length}</Text>
                    </Flex>
                </Flex>

            </Flex>

            {/* image */}
            <Image src={post.imageURL} alt='profile-post' w={"100%"} h={"100%"} objectFit={"cover"}/>
        
        </GridItem>

        {/* modal */}
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered={true} size={{base:"3xl", md:"5xl"}}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody bg={"black"} pb={5}>
                    <Flex gap={4} w={{base:"90%", sm:"70%", md:"full"}} mx={"auto"} maxH={"90vh"} minH={"50vh"} overflowY={"auto"}
                        flexDir={{base:"column", md:"row"}}
                        css={{'&::-webkit-scrollbar': {width: '0px'}}}
                    >
                        <Flex borderRadius={4} overflow={"hidden"} flex={1.5} maxH={"90vh"} minH={"50vh"}
                        border={"1px solid"} borderColor={"whiteAlpha.300"} justifyContent={"center"} alignItems={"center"}>
                            <Image objectFit={"contain"} src={post.imageURL} alt='profile post'/>
                        </Flex>

                        <Flex flex={1} flexDir={"column"} px={{base:"0", md:"10"}} pt={3}>
                            <Flex alignItems={"center"} justifyContent={"space-between"}>
                                <Link to={`/${userProfile.username}`}>
                                    <Flex alignItems={"center"} gap={4} display={{base:"none", md:"block"}}>
                                        <Avatar src={userProfile.profilePicURL} size={"sm"} name='Jay Verma'/>
                                        <Text fontWeight={"bold"} fontSize={12}>{userProfile.username}</Text>
                                    </Flex>
                                </Link>

                                {authUser?.uid === userProfile.uid && (
                                    <Button size={"sm"}
                                            bg={"transparent"}
                                            _hover={{bg:"whiteAplha.300", color:"red.600"}} borderRadius={4} p={1}
                                            onClick={handleDeletePost}
                                            isLoading = {isDeleting}
                                            >
                                        <MdDelete size={20} cursor={"pointer"}/>
                                    </Button>
                                )}
                            </Flex>

                            <Divider my={4} bg={"gray.500"}/>

                            <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                {post.caption && <Caption post={post}/>}

                                {post.comments.map((comment, idx) => (
                                    <Comment key={idx} comment={comment} isProfilePage={true}/>
                                ))}
                            </VStack>
                            <Divider my={4} bg={"gray.800"}/>

                            <PostFooter isProfilePage={true} post={post}/> 
                        </Flex>
                        
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default ProfilePost
