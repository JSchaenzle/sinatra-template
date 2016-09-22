import { connect } from 'react-redux';
import LoginCreateAccount, {CREATE_MODE, LOGIN_MODE} from '../components/LoginCreateAccount.jsx';
import { requestCreateAccountAndSignIn, requestSignIn } from '../actions/accountActions.js';
import { browserHistory } from 'react-router';

const mapStateToProps = (state, ownProps) => {
  return {mode: CREATE_MODE};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (accountInfo) => {
      console.log("Requesting create account");
      dispatch(requestCreateAccountAndSignIn(accountInfo))
        .then(() => browserHistory.push("/photoshoots"));
    },
    onLogIn: (credentials) => {
      console.log("Requesting log in now");
      dispatch(requestSignIn(credentials))
        .then(() => {
          browserHistory.push("/photoshoots");
        }, (err) => {
          console.log("Caught error: ", err);
        });
    }
  };
};

export const AccountAccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCreateAccount);
