import { useState, useContext } from "react";
import adminContext from "../../context/adminContext/AdminContext";
import js from "@eslint/js";

export default function LoginPage(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {setToken} = useContext(adminContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username : userName, password })
        }).then((response) =>{
            console.log(response.json());
            if(response.status === 200){
                return response.json().token;
            }
            else{
                return "error";
            }
        }).then(token => {
            if(token !== "error"){
                setToken(token);
            }
            else{
                setError("Invalid username or password");
            }
        })
    }
    return (
        <>
         {error != '' && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}.</span>
            </div>}
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                className="absolute inset-0 bg-gradient-to-r bg-gray-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

                <div className="max-w-md mx-auto">
                    <div>
                    <h1 className="text-2xl font-semibold">Login</h1>
                    </div>
                    <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <div className="relative">
                        <input autoComplete="off" id="email" value={userName} onChange={(e) =>{setUserName(e.target.value)}} name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">User Name</label>
                        </div>
                        <div className="relative">
                        <input autoComplete="off" id="password" value={password} onChange={(e) =>{setPassword(e.target.value)}} name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                        </div>
                        <div className="relative">
                        <button onClick={handleSubmit} className="bg-gray-900 text-white rounded-md px-2 py-1">Submit</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    </div>
    </>
    );
}