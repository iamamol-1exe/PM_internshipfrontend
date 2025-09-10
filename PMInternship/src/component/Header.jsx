import { BellIcon, MenuIcon, SearchIcon } from "../icons/Icon";

const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-8">
                    <div className="flex-shrink-0">
                         <h1 className="text-xl font-bold text-blue-600">FM <span className="text-black">Internship Scheme</span></h1>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-gray-900 font-semibold hover:text-blue-600">Jobs</a>
                        <a href="#" className="text-gray-900 font-semibold hover:text-blue-600">Companies</a>
                        <a href="#" className="text-gray-900 font-semibold hover:text-blue-600">Services</a>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search jobs here"
                            className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <SearchIcon />
                        </div>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <BellIcon />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                         <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">A</div>
                    </button>
                     <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
                        <MenuIcon />
                    </button>
                </div>
            </div>
        </div>
    </header>
);
export default Header;