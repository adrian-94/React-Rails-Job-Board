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
      console.log(res.data)
    })
    .catch(err => {
      setApplications([])
      console.log(err)
    }
    )
  }, [])
  const renderPage = () => {
    if(authenticated){
      return(
        <><h1>My Applications</h1>
        {applications && applications.map(application => {
          return (
            <JobWrapper key={application.job.id}>
              <h3>{application.job.title}</h3>
              <LinkWrapper>
                <Link to={`/jobs/` + application.job.slug}>View Job</Link>
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