import { BriefcaseIcon, LocationIcon } from "../icons/Icon";

const JobCard = ({ job }) => (
    <div className="bg-white rounded-lg shadow p-5 mb-4 border-l-4 border-transparent hover:border-blue-500 transition-all duration-300">
        <div className="flex items-start justify-between">
            <div>
                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                    <span>{job.company}</span>
                    {job.rating && <span className="ml-2 flex items-center">{job.rating} <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 ml-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg> ({job.reviews} Reviews)</span>}
                </div>
            </div>
             <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <img src={job.logo} alt={`${job.company} logo`} className="rounded-full" />
                </div>
            </div>
        </div>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 mt-3 gap-x-6 gap-y-2">
           {job.experience && <div className="flex items-center"><BriefcaseIcon /> {job.experience}</div>}
           {job.duration && <div className="flex items-center"><BriefcaseIcon /> {job.duration}</div>}
           {job.salary && <div className="flex items-center">₹ {job.salary}</div>}
           {job.location && <div className="flex items-center"><LocationIcon /> {job.location}</div>}
        </div>

        {job.description && <p className="text-sm text-gray-600 mt-3">{job.description}</p>}
        {job.skills && <p className="text-sm text-gray-600 mt-3">{job.skills}</p>}

        {job.tags && (
            <div className="flex flex-wrap gap-2 mt-3">
                {job.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium bg-orange-100 text-orange-600 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-400">{job.posted}</span>
            <div className="flex items-center space-x-4 text-sm font-medium text-gray-600">
                <button className="hover:text-blue-600">Hide</button>
                <button className="hover:text-blue-600">Save</button>
            </div>
        </div>
    </div>
);
export default JobCard;