import React, { useState } from 'react';

import {Link} from 'react-router-dom';
import { Input, Button, Icon } from 'semantic-ui-react';

const Navbar = (props) => {
  const [search, setSearch] = useState('');

  const _handleSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/stock/${search}`);
  }

  return (
    <nav>
      <Link to='/'>
        Home
      </Link>
      <Link to='/watchlist'>
        Watchlist
      </Link>
      <form onSubmit={_handleSubmit}>
        <Input onInput={ (e) => setSearch(e.target.value) } placeholder='AAPL' />
        <Button icon>
          <Icon name='search' />
        </Button>
      </form>
    </nav>
  );
}

export default Navbar;
