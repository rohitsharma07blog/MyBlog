import { Link } from "react-router-dom";


export default function BlogInfoCard({blogInfoObject}) {
    console.log(blogInfoObject.description);
    return (
        <>      
            <div class="h-80 justify-end flex flex-col sm:flex-row sm:max-w-2xl max-w-md mx-auto overflow-hidden bg-gray-700 rounded-lg shadow-lg dark:bg-gray-800  m-2" style={{backgroundImage: `url(${blogInfoObject.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                
                <div class="sm:p-4 h-full p-2 sm:w-1/2 flex flex-col justify-end bg-black bg-opacity-75">
                    <div>
                        <Link to={`/blog/${blogInfoObject.id}`}
                            className="block sm:mt-2 text-2xl font-semibold text-gray-50 dark:text-white hover:text-gray-600 hover:underline">{blogInfoObject.title}</Link>
                        <p class="mt-2 text-sm text-gray-200 dark:text-gray-400">{blogInfoObject.description}
                        </p>
                    </div>

                    <div class="mt-4">
                        <div class="flex items-center justify-between">
                            
                            <span class="mx-1 text-xs text-gray-400 dark:text-gray-300">{blogInfoObject.date}</span>
                            <span class="hover:cursor-pointer relative sm:left-12 text-xs text-gray-400 dark:text-gray-300"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f2f2f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg
                    >
                    </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}