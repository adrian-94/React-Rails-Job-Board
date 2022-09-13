import axios from 'axios';
import React, {useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import styled from 'styled-components';


const StyledOption = styled("option")`
  line-height: 26px;
  color: #249a8c;
`;
const StyledSelect = styled("select")`
  line-height: 26px;
  background-color: #FFFF00
`;

const Job = (props) => {
  const params = useParams();
  const [job, setJob] = useState(null);
  const[jobStatus, setJobStatus] = useState(1);
  const {authenticated, user } = useContext(AuthContext);
 
  console.log(useContext(AuthContext));

  const applyToJob = () => {
    // Should make an api call to apply to the job

    axios.post('/job_applications/',  {job_application: {"job_id": job.id,"user": user, "status":0}} )
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
      <h3> Job Status</h3>
      <StyledSelect
        onChange={handleChange}
        defaultValue={jobStatus}>
        <StyledOption value="0">Closed</StyledOption>
        <StyledOption value="1">Open</StyledOption>
        <StyledOption value="2">Draft</StyledOption>
      </StyledSelect>
      </Container>
  )
};

export default Job;