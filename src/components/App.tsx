import '../css/App.css'
import 'semantic-ui-css/semantic.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import { Stock, stockLoader } from '../routes/Stock'
import { Root } from '../routes/Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'stock/:symbol', loader: stockLoader, element: <Stock /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
