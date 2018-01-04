export const login = credentials => dispatch => 
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));
