import axios from 'axios';
import React, {useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Container, Form } from 'react-bootstrap';
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

const JobForm = () => {
  const navigate=useNavigate();

  const [title, setTitle]=useState("");
  const [description, setDescription]=useState("");
  const [status, setStatus]=useState(2);
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
    // axios.post('/jobs/',  {job: {"title": title, "description": description, "status": status}}, {headers: {
    //   'Authorization': `Basic ${localStorage.getItem('access-token')}` 
    // } })
    axios.post('/jobs/',  {job: {"title": title, "description": description, "status": status}})
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
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="New Title" onChange = {(e)=>setTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" onChange= {(e)=>setDescription(e.target.value)}/>
        </Form.Group>
        <StyledSelect className="mb-3"
          onChange={handleChange}
          defaultValue={status}>
          <StyledOption value="0">Closed</StyledOption>
          <StyledOption value="1">Open</StyledOption>
          <StyledOption value="2">Draft</StyledOption>
        </StyledSelect>
        <StyledButton type ="submit">Create Job</StyledButton>
      </Form>
    </Container>
  )
};

export default JobForm;