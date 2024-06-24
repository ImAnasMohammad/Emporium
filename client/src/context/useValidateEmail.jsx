import { createContext, useState, useContext } from 'react';

const ValidateEmailContext = createContext('');


const ValidateEmailProvider = ({ children }) => {
      
      const [validateEmail, setValidateEmail] = useState({
        mail:'',
        otpSend:false,
        alreadyExist:false,
        id:null,
        redirectTo:'/',
        token:null, //token for forgot password to update password
      });
      return (
          <ValidateEmailContext.Provider value={[ validateEmail, setValidateEmail ] }>
            {children}
          </ValidateEmailContext.Provider>
      );
  };
  const useValidateEmail =()=> useContext(ValidateEmailContext)


  export { useValidateEmail, ValidateEmailProvider };
  