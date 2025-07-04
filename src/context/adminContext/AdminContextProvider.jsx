import { useState } from "react";
import adminContext from "./AdminContext";

export default function AdminContextProvider({children}){
    const [token, setToken] = useState('');
    return (
        <adminContext.Provider value={{token, setToken}}>
            {children}
        </adminContext.Provider>
    );
}