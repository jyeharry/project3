import React, { useState } from 'react';

import {Link, useHistory} from 'react-router-dom';
import { Input, Button, Icon, Form } from 'semantic-ui-react';

const Navbar = (props) => {
  const [search, setSearch] = useState('');
  const history = useHistory();

  const _handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/stock/${search}`);
  }

  return (
    <nav>
      <Link to='/'>
        Home
      </Link>
      <Link to='/watchlist'>
        Watchlist
      </Link>
      <Form onSubmit={_handleSubmit}>
        <Form.Group>
          <Form.Input type='search' width={3} onInput={ (e) => setSearch(e.target.value) } placeholder='AAPL' />
          <Form.Button icon>
            <Icon name='search' />
          </Form.Button>
        </Form.Group>
      </Form>
    </nav>
  );
}

export default Navbar;
