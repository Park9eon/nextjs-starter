import React from 'react';
import { getPublic } from '../lib/api/public';

class Public extends React.Component {
  state = {
    message: null,
  };

  async componentDidMount() {
    const { message } = await getPublic();
    this.setState({ message });
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <h1>Public</h1>
        <span>{message}</span>
      </div>
    );
  }
}

export default Public;
