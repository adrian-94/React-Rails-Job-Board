import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider';
import styled from 'styled-components'

const ApplicationWrapper = styled.div`
  border: 1px solid #efefef;
`

const JobWrapper = styled.div`
  border: 1px solid #efefef;
  background-color: #00FFFF;
`

const LinkWrapper = styled.div`
  margin: 30px 0 20px 0;
  height:50px;
  a {
    color: #fff;
    background-color: #71b406;
    border-radius: 4px;
    padding: 10px 50px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #71b406;
    text-align: center;
    line-height: 20px;
    min-height: 40px;
    margin: 7px;
    font-weight: 600;
    width: 100%;
    transition: ease-in-out 0.1s;
    &:hover{
      border-color: #619a07;
      background: #619a07;
    }
  }
  `

const Applications = () => {
  const {authenticated} = useContext(AuthContext)
  const [applications, setApplications] = useState(null)
  React.useEffect(() => {

    axios.get('/job_applications')
    .then(res => {
      setApplications(res.data)
      console.log("application Data"+res.data)
    })
    .catch(err => {
      setApplications([])
      console.log(err)
    }
    )
  }, [])

  // const[jobData,  setJob] = useState([]);
  const getJob = (job_id) => {
    console.log('/jobs/'+job_id);
    axios.get('/jobs/'+job_id)
    .then(res => {
      // setJobs(res.data)
      console.log("response data"+res.data);
    })
    .catch(err => {
      console.log("Error"+err);
    }
    )
  } 
  const renderPage = () => {
    if(authenticated){
      return(
        <><h1>My Applications</h1>
        {applications && applications.map(application => {
          console.log("application Data curr"+getJob(application.job_id))
          let currJob = getJob(application.job_id);
          return (
            <JobWrapper key={currJob.id}>
              <h3>{currJob.title}</h3>
              <LinkWrapper>
                <Link to={`/jobs/` + currJob.slug}>View Job</Link>
              </LinkWrapper>  
            </JobWrapper>
          )
        })
        } 
        </>
      )
    } else {
      return (
        <p>You must be logged in</p>
      )
    }
  };
  return (
    <ApplicationWrapper>
      {renderPage()}
    </ApplicationWrapper>
  )
};

export default Applications;