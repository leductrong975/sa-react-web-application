import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function signup(email, password) {
        const newUser = await auth.createUserWithEmailAndPassword(email, password);
        return await newUser.user.sendEmailVerification();
        // return newUser
    }

    async function login(email, password) {
        const userCredential = await auth.signInWithEmailAndPassword(email, password)
        console.log(userCredential.user.emailVerified)
        if (!userCredential.user.emailVerified) {
            logout()
        }
        return userCredential.user.emailVerified
    }

    const logout = () => auth.signOut()


    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}