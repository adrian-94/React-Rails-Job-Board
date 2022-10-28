import axios from 'axios';
import React, { useContext, useState } from 'react';
// import RenderJson from '../components/RenderJson';
import { Link } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider';
import styled from 'styled-components'

const HomeWrapper = styled.div`
  border: 1px solid #efefef;
  color: #228B22;
`

const JobWrapper = styled.div`
  border: 1px solid #efefef;
  background-color: #FFFFFF;
`

const styledDiv = styled.span`
  border: 1px solid #efefef;
  border: 1px solid #71b406;
  font-size: 20px;
  color:#0000FF;
  text-align: left;
  background-color: #FFFFFF;
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
const Home =  () => {
  const {authenticated, user} = useContext(AuthContext);
  console.log("current user"+ user);
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

    <HomeWrapper>
      {authenticated? <styledDiv> Welcome, {user.email}</styledDiv> : <div></div>}
      {authenticated?<LinkWrapper><Link to={`/job/form`}>Create Job</Link></LinkWrapper>  : <div></div>}
      <h1>All Jobs</h1>
      {/* Render authenticated information */}
      {/* Render jobs */}
      {
        jobs && jobs.map(job => {
          return (
            <JobWrapper key={job.id}>
              <h3>{job.title}</h3>
              <LinkWrapper>
                <Link to={`/jobs/` + job.slug}>View Job</Link>
              </LinkWrapper>  
            </JobWrapper>
          )
        })
      }
    </HomeWrapper>
  )
};

export default Home;