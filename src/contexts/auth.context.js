import React, { useState } from 'react';

const AuthContext = React.createContext(null)


export default function AuthContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn, setIsLoggedIn
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }