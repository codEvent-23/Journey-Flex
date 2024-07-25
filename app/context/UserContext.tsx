import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

interface UserContextType {
    email: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    topUpBalance: number;
    refreshUserData: () => void;
}

const defaultContext: UserContextType = {
    email: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    topUpBalance: 0,
    refreshUserData: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [userData, setUserData] = useState<UserContextType>(defaultContext);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe; // Unsubscribe on unmount
    }, []);

    useEffect(() => {
        refreshUserData();
    }, [user]);

    const refreshUserData = async () => {
        if (user?.phoneNumber) {
            const userQuerySnapshot = await firestore()
                .collection('users')
                .where('phoneNumber', '==', user.phoneNumber)
                .get();

            if (!userQuerySnapshot.empty) {
                const userDoc = userQuerySnapshot.docs[0];
                console.log('User data:', userDoc.data());
                const data = userDoc.data();
                setUserData({
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    phoneNumber: data.phoneNumber,
                    topUpBalance: data.topUpBalance,
                    refreshUserData
                });
            } else {
                console.log('No user found with this phone number');
                setUserData({
                    ...defaultContext,
                    refreshUserData
                });
            }
        }
    };

    return (
        <UserContext.Provider value={{...userData, refreshUserData}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = (): UserContextType => {
    return useContext(UserContext);
}
