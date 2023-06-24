import axios from 'axios';
import { useState, useEffect, createContext } from 'react';

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get data from cookie if page is reloaded after login
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data);
            });
        }
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}