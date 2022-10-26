import axios from 'axios';
import React, {useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link,useParams } from 'react-router-dom';
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

const Job = () => {
  const params = useParams();
  const [job, setJob] = useState(null);
  const[jobStatus, setJobStatus] = useState(1);
  const {authenticated, user } = useContext(AuthContext);
 
  console.log(useContext(AuthContext));

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
      {authenticated?<LinkWrapper><Link to={`/applications/form`} state={{ job, user}}>Create Application</Link></LinkWrapper>  : <div></div>}
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