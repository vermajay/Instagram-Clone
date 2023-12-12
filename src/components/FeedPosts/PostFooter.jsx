import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants'
import usePostComment from '../../hooks/usePostComment'
import useAuthStore from '../../store/authStore'
import useLikeAndUnlikePost from '../../hooks/useLikeAndUnlikePost'
import { timeAgo } from '../../utils/timeAgo'
import CommentsModal from '../Modals/CommentsModal'

const PostFooter = ({post, isProfilePage, createrProfile}) => {

    const {handlePostComment,isCommenting} = usePostComment()
    const [comment, setComment] = useState('')
    const authUser = useAuthStore(state=>state.user)
    const commentRef = useRef(null)

    const {handleLikeAndUnlikePost,isLiked,likes} = useLikeAndUnlikePost(post)

    const {isOpen,onOpen,onClose} = useDisclosure()

    const handleSubmitComment = async() => {
        await handlePostComment(post.id, comment)
        setComment('')
    }

  return (
    <Box mb={10} mt={"auto"}>
        <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
            <Box onClick={handleLikeAndUnlikePost} cursor={"pointer"} fontSize={18}>
                {!isLiked ? <NotificationsLogo/> : <UnlikeLogo/>}
            </Box>

            <Box cursor={"pointer"} fontSize={18} onClick={()=>commentRef.current.focus()}>
                <CommentLogo/>
            </Box>
        </Flex> 
        <Text fontWeight={600} fontSize={"sm"}>
            {likes} likes
        </Text>

        {isProfilePage && 
            <Text fontSize={12} color={"gray"}>
                Posted {timeAgo(post.createdAt)}
            </Text>
        }

        {!isProfilePage && (
            <>
                <Text fontWeight={700} fontSize={"sm"}>
                    {createrProfile?.username}{" "}
                    <Text fontWeight={400} as={"span"}>
                        {post.caption}
                    </Text>
                </Text>
                {post.comments.length > 0 && 
                    <Text fontSize={"sm"} color={"gray"} cursor={"pointer"} onClick={onOpen}>
                        View all {post.comments.length} comments
                    </Text>
                }
                <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
            </>
        )}

        {authUser && (
            <Flex alignItems={"center"} justifyContent={"space-between"} gap={2} w={"full"}>
                <InputGroup>
                    <Input variant={"flushed"} placeholder='Add a comment...' fontSize={14} 
                    onChange={(e)=>setComment(e.target.value)}
                    value={comment}
                    ref={commentRef}
                    />
                    <InputRightElement>
                        <Button fontSize={14} color={"blue.500"} fontWeight={600} cursor={"pointer"} _hover={{color:"white"}} bg={"transparent"} onClick={handleSubmitComment} isLoading={isCommenting}>
                            Post
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        )}
    </Box>
  )
}

export default PostFooter
