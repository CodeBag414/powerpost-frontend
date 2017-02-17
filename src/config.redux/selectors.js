/**
 * The global state selectors
 */

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('routing');
    if (typeof prevRoutingState === 'undefined' || !prevRoutingState.equals(routingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
};

export {
    makeSelectLocationState
};