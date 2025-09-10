import JobCard from "./JobCard";
import KeySkills from "./KeySkills";

const MainContent = ({ setSkills, jobListings }) => (

  <main className="w-full lg:flex-1">
    <KeySkills setSkills1={setSkills} />
    <div>
      {Array.isArray(jobListings) && jobListings.length > 0 ? (
        jobListings.map((job, index) => <JobCard key={index} job={job} />)
      ) : (
        <div className="bg-white rounded-lg shadow p-5 mb-4 text-center">
          <p className="text-gray-600">
            No job listings available. Please adjust your search criteria.
          </p>
        </div>
      )}
    </div>
  </main>
);
export default MainContent;
