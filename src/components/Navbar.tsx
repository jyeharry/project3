import { useNavigate } from 'react-router-dom'
import { Container, Menu, Form, Button } from 'semantic-ui-react'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item as="a" href="/" header>
          Investment Calculator
        </Menu.Item>
        <Menu.Item>
          <Form
            onSubmit={(e: any) => {
              e.preventDefault()
              navigate(`/stock/${e.target[0].value}`)
            }}
          >
            <Form.Input type="text" placeholder="Search..." action>
              <input />
              <Button type="submit">Search</Button>
            </Form.Input>
          </Form>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Navbar
