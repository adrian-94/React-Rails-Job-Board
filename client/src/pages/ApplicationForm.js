import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';

const StyledSelect = styled("select")`
  line-height: 26px;
  background-color: #FFFF00
`;

const StyledOption = styled("option")`
  line-height: 26px;
  color: #249a8c;
`;

const StyledButton = styled("button")`
  display: block;
  background-color: #00FFFF;
`

const ApplicationForm = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const{ job, user }  = location.state;
  console.log("Current User in Job form"+user)
  const [name, setName]=useState("");
  const [coverLetter, setCoverLetter]=useState("");
  const [experience, setExperience]=useState("");
  const [contact, setContact]=useState("");
  const [status, setStatus]=useState(1);
  const handleChange = (event) => {
    const selected = parseInt(event.target.value);
    if(selected !== status){   
      setStatus(selected);   
    }
  }
  // const [user_id, setUserId]=useState(null)
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/job_applications/',  {job_application: {"name": name, "coverLetter": coverLetter, "experience": experience,
    "contact": contact, "job_id": job.id,"user": user, "status":status}})
    .then(res => {
      console.log("Success" + res)
      navigate('/');
    })
    .catch(err => {
      console.log(err.response.data)
    }
    )
  };

  return(

    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Full Name" onChange = {(e)=>setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCoverLetter">
          <Form.Label>Cover Letter</Form.Label>
          <Form.Control type="text" placeholder="Cover Letter" onChange= {(e)=>setCoverLetter(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicExperience">
          <Form.Label>Experience</Form.Label>
          <Form.Control type="text" placeholder="Experience" onChange= {(e)=>setExperience(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicExperience">
          <Form.Label>Contact</Form.Label>
          <Form.Control type="text" placeholder="contact" onChange= {(e)=>setContact(e.target.value)}/>
        </Form.Group>
        <StyledSelect className="mb-3"
          onChange={handleChange}
          defaultValue={status}>
          <StyledOption value="0">applied</StyledOption>
          <StyledOption value="1">reviewed</StyledOption>
          <StyledOption value="2">rejected</StyledOption>
          <StyledOption value="2">withdrawn</StyledOption>
        </StyledSelect>
        <StyledButton type ="submit">Create Job Application</StyledButton>
      </Form>
    </Container>
  )
};

export default ApplicationForm;