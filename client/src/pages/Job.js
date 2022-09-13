import axios from 'axios';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import Select from 'react-select'

const Job = (props) => {
  const params = useParams();
  console.log(params.slug)
  const [job, setJob] = useState(null);
  const [status, setStatus] = useState(0);
  
  const applyToJob = () => {
    // Should make an api call to apply to the job
  }

  const updateJobStatus = () => {
    // Should make an api call to updat the job  status
    console.log("params in req" + params.status)
    axios.put('/jobs/' + params.slug, { status: status })
    .then(res => {
      console.log("Success")
    })
    .catch(err => {
      setStatus([])
      console.log(err)
    } 
    )
  }

  // React.useLayoutEffect(() => {

  // } )
  React.useEffect(() => {
    console.log("Slug"+  params.slug);
    axios.get('/jobs/' + params.slug)
    .then(res => {
      setJob(res.data)
      // setStatus(res.data.status)
      console.log("fetched job " + res.data)
    })
    .catch(err => {
      setJob([])
      console.log(err)
    }
    )
  }, [])

  const handleChange = (jobStatus) => {
    if(status !== jobStatus){
      setStatus(jobStatus)
      params.status = status;
      updateJobStatus();
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
        defaultValue={status}
        className="browser-default custom-select">
        <option value="0">Closed</option>
        <option value="1">Open</option>
        <option value="2">Draft</option>
      </select>
      </Container>
  )
};

export default Job;