import JobCard from "./JobCard";
import KeySkills from "./KeySkills";
import { jobListings } from "../data/jobListingsData";


 const MainContent = ({setSkills}) => (
    <main className="w-full lg:flex-1">
        <KeySkills setSkills1 ={setSkills} />
        <div>
            {jobListings.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    </main>
);
export default MainContent;