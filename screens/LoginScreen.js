import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { logIn } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
function LoginScreen() {
   
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx=useContext(AuthContext)
  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token= await logIn(email, password);
      authCtx.authenticate(token)

    } catch (error) {
      Alert.alert('Authenticatio failed!',"Couldn't log you in.Please check your credentials or try again later!")
      setIsAuthenticating(false);
    }
    }
  

  if (isAuthenticating) {
    return <LoadingOverlay message={'Logging you in...'} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen; 