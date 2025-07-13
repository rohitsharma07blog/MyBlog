import { NAME, EMAIL, PROFILE_IMAGE, ABOUT, PHONE, LINKEDIN, LOCATION} from "../../constants";
import { Link } from "react-router-dom";
export default function Footer() { 
    return (
        <footer>
    <div class="bg-gray-800 py-4 text-gray-400">
      <div class="container px-4 mx-auto">
        <div className="-mx-4 flex flex-wrap justify-between">
           
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 text-center mb-8 md:mb-0">
                <img src={PROFILE_IMAGE} alt="Profile Picture" className="rounded-full w-48 h-48 mx-auto mb-4 object-cover transition-transform duration-300 hover:scale-105"/>
                <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">{NAME}</h1>
                <center>

                <a href={LINKEDIN} className=" w-40 px-4 py-2 border flex gap-2 bg-white border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475661/linkedin-color.svg" loading="lazy" alt="google logo"/>
                    <span className="pt-0.5">Linkedin</span>
                </a>
                </center>

                <br />
                <Link to={'/admin/Editor'} className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Admin Login</Link>
            </div>
            <div class="md:w-2/3 md:pl-8">
                <h2 class="text-xl font-semibold text-indigo-800 dark:text-white mb-4">About Me</h2>
                <p class="text-gray-700 dark:text-gray-300 mb-6">
                   {ABOUT}
                </p>              
                <h2 class="text-xl font-semibold text-indigo-800 dark:text-white mb-4">Contact Information</h2>
                <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                    <li class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {EMAIL}
                    </li>
                    <li class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        {PHONE}
                    </li>
                    <li class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>
                        {LOCATION}
                    </li>
                </ul>
            </div>
        </div>
    </div>     
          
  
      </div>
    </div>
    
  </footer>
    );
}