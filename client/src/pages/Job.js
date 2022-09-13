import axios from 'axios';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import Select from 'react-select'

const Job = (props) => {
  const params = useParams();
  const [job, setJob] = useState(null);
  
  const applyToJob = () => {
    // Should make an api call to apply to the job
  }

  const updateJobStatus = (jobStatus) => {
    // Should make an api call to update the job  status
    axios.patch('/jobs/' + params.slug, { status: jobStatus }, {
      headers: {
      'Content-Type': 'application/json'
      }})
    .then(
      console.log("Success")
    )
    .catch(err => {
      console.log("Failed update status with error"+ err);
    } 
    )
  }

  // React.useLayoutEffect(() => {

  // } )
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

  const handleChange = (jobStatus) => {
    if(job.status !== jobStatus){      
      updateJobStatus(jobStatus);
    }
  }

  const options =  [
    { value: '0', label: 'closed' },
    { value: '1', label: 'open' },
    { value: '2', label: 'draft' }
  ];

  return(
    <Container >
      <h1>{job?.title}</h1>
      <p>{job?.description}</p>
      <button onClick={applyToJob}>Apply to Job</button>
      <h2> Job Status</h2>
      <select
        onChange={handleChange}
        defaultValue={1}
        className="browser-default custom-select">
        <option value="0">Closed</option>
        <option value="1">Open</option>
        <option value="2">Draft</option>
      </select>
      </Container>
  )
};

export default Job;