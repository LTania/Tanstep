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
      startingLevelTestPassed,
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
      if (startingLevelTestPassed || props.location.pathname === '/test') {
        return (
          <ComposedComponent {...props} />
        );
      } else {
        return (
          <Redirect to={{ pathname: "/test", state: { nextPathname: props.location.pathname } }} />
        );
      }
    }

    return null;
  };
}

const mapStateToProps = (state) => {
  const {
    loggedIn,
    checked,
    startingLevelTestPassed,
    loading,
    error,
  } = state.authorization;

  return {
    loggedIn,
    checked,
    startingLevelTestPassed,
    loading,
    error,
  };
};

export default compose(
  connect(mapStateToProps, null),
  Wrapper
);