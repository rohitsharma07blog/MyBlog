import { Link } from "react-router-dom";


export default function BlogInfoCard({blogInfoObject}) {
    return (
        <>      
            <div className="h-80 justify-end flex flex-col sm:flex-row sm:max-w-2xl max-w-md overflow-hidden bg-gray-700 rounded-lg shadow-lg dark:bg-gray-800  m-2" style={{backgroundImage: `url(${blogInfoObject.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

                <div className="sm:p-4 h-full p-2 sm:w-1/2 flex flex-col justify-end bg-black bg-opacity-75">
                    <div>
                        <Link to={`/blog/${blogInfoObject.date}/${blogInfoObject.category}/${blogInfoObject.title}/${blogInfoObject.id}`}
                            className="block sm:mt-2 text-3xl font-semibold text-gray-50 dark:text-white hover:text-gray-600 hover:underline">{blogInfoObject.title}</Link>
                        <p className="mt-2 text-xl text-gray-200 dark:text-gray-400">{blogInfoObject.description}
                        </p>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center justify-between">

                            <span className="mx-1 text-lg text-gray-400 dark:text-gray-300">{blogInfoObject.date}</span>
                            <span className="hover:cursor-pointer relative sm:left-12 text-xs text-gray-400 dark:text-gray-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f2f2f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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