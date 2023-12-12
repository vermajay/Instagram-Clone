import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/firebase';
import Navbar from '../../components/Navbar/Navbar';

const PageLayout = ({children}) => {
    const {pathname} = useLocation();
    const [user, loading] = useAuthState(auth);

    const canRenderSidebar = pathname !== '/auth' && user;
    const canRenderNavbar = pathname !== '/auth' && !user && !loading;

    const checkingUserIsAuth = !user && loading;
    if(checkingUserIsAuth) return <PageLayoutSpinner/>

  return (
    <div>
      <Flex flexDir={canRenderNavbar ? "column" : "row"}>
        {/*sidebar on the left*/}
        {canRenderSidebar ? 
        <Box w={{base:"56px", md:"240px"}}>
          <Sidebar/>
        </Box>
        : null}
        {/*nabar on the top*/}
        {canRenderNavbar ? <Navbar/> : null}
        {/*content on the right*/}
        <Box flex={1} w={{base: "calc(100% - 70px)", md: "calc(100% - 240px)"}} mx={"auto"}>
          {children}
        </Box>
      </Flex>
    </div>
  )
}

export default PageLayout


const PageLayoutSpinner = () => {
  return (
    <Flex flexDir={"column"} h={'100vh'} alignItems={"center"} justifyContent={"center"}>
      <Spinner size='xl'/>
    </Flex>
  )
}