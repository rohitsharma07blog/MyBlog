import { useContext } from "react";
import LoginPage from "../components/Login/LoginPage";
import adminContext from "../context/adminContext/AdminContext";
import Editor from "../components/Editor/Editor";
export default function AdminPage(){
    const {token} = useContext(adminContext);

    return (
        <>
            {token != '' ? <Editor/> : <LoginPage/>}
        </>
        
    );
}