import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../providers/AuthProvider';

const JobForm = () => {
  
  //:title, :user_id, :description, :status

  // const {user} = useContext(AuthContext);
  const [title, setTitle]=useState("");
  const [description, setDescription]=useState("");
  const [status, setStatus]=useState("Draft");
  // const [user_id, setUserId]=useState(null)
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/jobs/',  {job: {"title": title, "description": description, "status": status}} )
    .then(res => {
      console.log("Success" + res)
    })
    .catch(err => {
      console.log(err)
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
        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="draft" onChange= {(e)=>setStatus(e.target.value)}/>
        </Form.Group>
        <Button type ="submit">Create Job</Button>
      </Form>
    </Container>
  )
};

export default JobForm;