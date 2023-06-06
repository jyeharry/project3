import { Outlet, useNavigation } from 'react-router-dom'
import { Container, Loader } from 'semantic-ui-react'
import Navbar from '@components/Navbar'

export const Root = () => {
  const navigation = useNavigation()
  return (
    <>
      <Navbar />
      {navigation.state === 'loading' ? (
        <Loader active />
      ) : (
        <Container>
          <Outlet />
        </Container>
      )}
    </>
  )
}
