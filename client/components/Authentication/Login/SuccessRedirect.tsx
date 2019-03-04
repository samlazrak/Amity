import React from 'react';
import { withRouter } from 'react-router-dom';
import { getAuthSuccessRedirect, clearAuthSuccessRedirect } from '../../../utils/Authentication';

class SuccessRedirect extends React.Component<any, any> {
  componentDidMount() {
    const redirectTo = getAuthSuccessRedirect() || '/';
    clearAuthSuccessRedirect();
    this.props.history.push(redirectTo);
  }

  render() {
    return null;
  }
}

export default withRouter(SuccessRedirect);
