import { useContext } from "react";
import LoginPage from "../components/Login/LoginPage";
import adminContext from "../context/adminContext/AdminContext";
import Editor from "../components/Editor/Editor";
import Header from "../components/Header/Header"
import { Outlet } from "react-router-dom";
export default function AdminPage(){
    const {token} = useContext(adminContext);

    return (
        <>
        <Header/>
            {token != '' ? <Outlet/> : <LoginPage/>}
        </>
        
    );
}