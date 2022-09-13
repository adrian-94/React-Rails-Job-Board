import axios from 'axios';
import React, {useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Job = (props) => {
  const params = useParams();
  const [job, setJob] = useState(null);
  const[jobStatus, setJobStatus] = useState(1);
  const {authenticated, uid} = useContext(AuthContext);

  console.log(useContext(AuthContext));

  const applyToJob = () => {
    // Should make an api call to apply to the job

    axios.post('/job_applications/',  {job_application: {"job_id": job.id, "status":  0}} )
    .then(res => {
      console.log("Success" + res)
    })
    .catch(err => {
      console.log(err)
    }
    )
  }

  const updateJobStatus = (jobStatus) => {
     axios.patch('/jobs/' + params.slug,  { "status": jobStatus } )
    .then(res => {
      console.log("Success" + res)
    })
    .catch(err => {
      console.log(err)
    }
    )
  }

  React.useEffect(() => {
    axios.get('/jobs/' + params.slug)
    .then(res => {
      setJob(res.data)
    })
    .catch(err => {
      setJob([])
      console.log(err)
    }
    )
  }, [])

  const handleChange = (event) => {
    const selected = parseInt(event.target.value);
    if(selected !== jobStatus){   
      setJobStatus(selected);   
      updateJobStatus(selected);
    }
  }

  return(
    <Container >
      <h1>{job?.title}</h1>
      <p>{job?.description}</p>
      {authenticated?<button onClick={applyToJob}>Apply to Job</button> : <div></div>}
      <h2> Job Status</h2>
      <select
        onChange={handleChange}
        defaultValue={jobStatus}
        className="browser-default custom-select">
        <option value="0">Closed</option>
        <option value="1">Open</option>
        <option value="2">Draft</option>
      </select>
      </Container>
  )
};

export default Job;