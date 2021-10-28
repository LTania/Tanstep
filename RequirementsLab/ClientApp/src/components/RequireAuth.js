import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as backend from '../store/authorization';

function Wrapper(ComposedComponent) {
  return (props) => {
    const {
      dispatch,
      loggedIn,
      checked,
      //loading,
      //error, // TODO render error, loading
    } = props;

    if (!checked) {
      dispatch(backend.checkAuthorization());
    } else if (!loggedIn) {
      return (
        <Redirect to={{ pathname: "/authorization", state: { nextPathname: props.location.pathname } }} />
      );
    } else {
      return (
        <ComposedComponent {...props} />
      );
    }

    return null;
  };
}

const mapStateToProps = (state) => {
  const {
    loggedIn,
    checked,
    loading,
    error,
  } = state.authorization;

  return {
    loggedIn,
    checked,
    loading,
    error,
  };
};

export default compose(
  connect(mapStateToProps, null),
  Wrapper
);