import React from 'react';
import { getPrivate } from '../lib/api/private';

class Private extends React.Component {
  state = {
    message: null,
  };

  async componentDidMount() {
    const { message } = await getPrivate();
    this.setState({ message });
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <h1>Private</h1>
        <span>{message}</span>
      </div>
    );
  }
}

export default Private;
