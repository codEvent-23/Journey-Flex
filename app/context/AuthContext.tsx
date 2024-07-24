import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";

interface AuthContextType {
    isAuthenticated: boolean;
    user: FirebaseAuthTypes.User | null;
    login: (user: FirebaseAuthTypes.User) => void;
    logout: () => void;
}

const defaultContext: AuthContextType = {
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    const login = (user: FirebaseAuthTypes.User): void => {
        setUser(user);
        // localStorage.setItem("user", user.to);
        setIsAuthenticated(true);
    }

    const logout = () => {
        setUser(null);
        // localStorage.removeItem("token");
        setIsAuthenticated(false);
    }

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setUser(user);
        })
    },[])

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    return useContext(AuthContext);
}
