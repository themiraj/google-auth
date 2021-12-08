import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    confirmPasswordReset
} from '@firebase/auth';
import {createContext,useContext,useEffect,useState} from 'react'
import { auth } from '../utils/init-firebas'


const AuthContext = createContext({
    currentUser:null,
    register: () => Promise,
    login: () => Promise,
    logout: () => Promise,
    signInWithGoogle: () => Promise,
    ForgetPassword: () => Promise,
    resetPassord: ()=> Promise
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({children}){
    const [currentUser, setcurrentUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,user => {
            setcurrentUser(user);
        })
        return () => {
            unsubscribe()
        }
    }, [])

    function register(email,password) {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    function login(email,password) {
        return signInWithEmailAndPassword(auth,email,password);
    }

    function signInWithGoogle(){
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    function resetPassord(oobCode,newPassword){
        return confirmPasswordReset(auth,oobCode,newPassword); 
    }

    function ForgetPassword(email){
        return sendPasswordResetEmail(auth,email,{
            url:'http://localhost:3000/login',
        })
    }

    function logout(){
        return signOut(auth);
    }

    const value = {
        currentUser,
        register,
        login,
        logout,
        signInWithGoogle,
        ForgetPassword,
        resetPassord,
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}