import React, { useState } from 'react';

import {Link, useHistory} from 'react-router-dom';
import { Icon, Form } from 'semantic-ui-react';

const Navbar = (props) => {
  const [symbol, setSymbol] = useState('');
  const history = useHistory();

  const _handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/stock/${symbol}`);
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
          <Form.Input type='search' width={3} onInput={ (e) => setSymbol(e.target.value) } placeholder='AAPL' />
          <Form.Button icon>
            <Icon name='search' />
          </Form.Button>
        </Form.Group>
      </Form>
    </nav>
  );
}

export default Navbar;
