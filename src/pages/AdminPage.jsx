import { useContext } from "react";
import LoginPage from "../components/Login/LoginPage";
import adminContext from "../context/adminContext/AdminContext";
import Editor from "../components/Editor/Editor";
import Header from "../components/Header/Header";
export default function AdminPage(){
    const {token} = useContext(adminContext);

    return (
        <>
        <Header/>
            {token != '' ? <Editor/> : <LoginPage/>}
        </>
        
    );
}