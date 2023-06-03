import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Menu, Form, Button } from 'semantic-ui-react'

const Navbar = () => {
  const navigate = useNavigate()
  const [canSubmit, setCanSubmit] = useState(true)

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
              if (!canSubmit) {
                alert('You can only make one submission per minute')
                return
              }
              setCanSubmit(false)
              navigate(`/stock/${e.target[0].value}`)
              setTimeout(() => { setCanSubmit(true) }, 60000)
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
