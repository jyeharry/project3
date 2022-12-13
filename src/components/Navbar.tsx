import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Container, Menu, Form, Input, Button} from 'semantic-ui-react'

const Navbar = (props) => {
  const history = useHistory();

  const _handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/stock/${e.target[0].value}`);
  }

  return (

    <Menu fixed='top'>
      <Container>
        <Menu.Item as='a' href='/' header>
          Investment Calculator
        </Menu.Item>
        <Menu.Item>
          <Form onSubmit={_handleSubmit}>
            <Form.Input type='text' placeholder='Search...' action>
              <input />
              <Button type='submit'>Search</Button>
            </Form.Input>
          </Form>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
