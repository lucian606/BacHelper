import { useAuth } from "../contexts/AuthContext";

function HomePage(props) {

    const { loading, currentUser, setLoading} = useAuth();
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center">
                <div className="text-center">
                    <svg role="status" className="inline mr-2 w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            </div>
        )
    }
    return (
        // <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        // <div class="flex items-center flex-shrink-0 text-white mr-6">
        //     <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
        //     <span class="font-semibold text-2xl tracking-tight">Tailwind CSS</span>
        // </div>
        // <div class="block lg:hidden">
        //     <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        //     <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        //     </button>
        // </div>
        // <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        //     <div class="text-sm lg:flex-grow">
        //         {
        //             props.items.map(item => (
        //                 <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-xl text-teal-200 hover:text-white mr-4">
        //                     {item}
        //                 </a>                        
        //             ))
        //         }
        //     </div>
        // </div>
        // </nav>
        <div className="max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-2xl w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
            <div className="text-center font-medium text-xl">Welcome to your dashboard!</div>
            <div className="text-3xl font-bold text-gray-900 mt-2 text-center">{currentUser.email}</div>
        </div>
    );
}

export default HomePage;