import { Outlet, useNavigation } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import Navbar from '@components/Navbar'

export const Root = () => {
  const navigation = useNavigation()
  return (
    <>
      <Navbar />
      {navigation.state === 'loading' ? <Loader active /> : (
        <div className='container'>
          <Outlet />
        </div>
      )}
    </>
  )
}
