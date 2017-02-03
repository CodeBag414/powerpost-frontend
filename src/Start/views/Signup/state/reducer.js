function oauthReducer(state = {authenticating: false, user: null, error: null}, actions){
    switch (actions.type) {
      case 'OAUTH_START':
        return {authenticating: true, user: null, error: null};
      case 'OAUTH_CANCELED':
        return {authenticating: false, user: null, error: 'user canceled'};
      case 'OAUTH_ERROR':
        return {authenticating: false, user: null, error: actions.payload};
      case 'OAUTH_LOAD_USER':
        return {authenticating: false, user: actions.payload, error: null};
      case 'OAUTH_SIGNOUT':
        return {authenticating: false, user: null, error: null};
      default:
        return state;
    }
}

export default oauthReducer;