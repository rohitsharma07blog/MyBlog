import React from 'react';
import { NAME, EMAIL } from '../../constants.js';

export default function Header(){

    return (
       <header className="w-full">
  <nav className="border-gray-200 bg-gray-900 py-2.5">
    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center px-4">
      <img className="w-10 h-10 rounded-md mr-5" src="/public/blog_logo.svg" alt="Rounded avatar"></img>
      <a href="#" className="flex items-center"><span className="self-center text-xl font-semibold whitespace-nowrap text-white">{NAME}</span></a>
      
    </div>
  </nav>
</header>
    )
}