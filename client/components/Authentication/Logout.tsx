import React from 'react';
import { clearAuthToken } from '../../utils/Authentication';

class Logout extends React.Component<any, any> {
  componentDidMount() {
    clearAuthToken();
    this.props.history.push('/login');
  }

  render() {
    return null;
  }
}

export default Logout;
