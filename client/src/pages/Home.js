import axios from 'axios';
import React, { useContext, useState } from 'react';
// import RenderJson from '../components/RenderJson';
import { Link } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider';

const Home =  () => {
  const {authenticated, email} = useContext(AuthContext);
  const [jobs, setJobs] = useState(null)

  // On initial render fetch /jobs from the api
  React.useEffect(() => {

    axios.get('/jobs')
    .then(res => {
      setJobs(res.data)
      console.log(res.data)
    })
    .catch(err => {
      setJobs([])
      console.log(err)
    }
    )
  }, [])

  return(

    <div>
      <h1>All Jobs</h1>
      {/* Render authenticated information */}
      {authenticated? <div> Hello {email}</div> : <div></div>}
      {/* Render jobs */}
      {
        jobs && jobs.map(job => {
          return (
            <div key={job.id}>
              <h3>{job.title}</h3>
              <Link to={`/jobs/` + job.slug}>View Job</Link>
            </div>
          )
        })
      }
    </div>
  )
};

export default Home;