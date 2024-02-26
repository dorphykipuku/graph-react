import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input as RsInput } from 'reactstrap';
import axios from 'axios';

import './Login.css';
import { useNavigate } from 'react-router-dom';


const CreateCompte = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const navigate = useNavigate()
 
  const saveUser=(event)=>{
    event.preventDefault()
    let user = {nom, email, password}
    axios.post("http://localhost:8080/u", user)
    .then(resp=>{
        alert("un utilisateur ajouté")
        navigate("/")
    })
    .catch(error=>{
        console.log(error)
    })
}



  return (
    <div className="login-background">
      <Form className="login-form" onSubmit={saveUser}>
        <h2 className="text-center">Création Compte</h2>
        <FormGroup>
          <Label for="email">nom d'utilisateur</Label>
          <RsInput
            type="text"
            name="nom"
            id="nom"
            placeholder="taper nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">E-mail </Label>
          <RsInput
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Mot de passe</Label>
          <RsInput
          required
            type="password"
            name="password"
            id="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
      
         <Button color="success" className="m-3 ">
          valider
        </Button>
        <Button color="danger" className="m-3" onClick={()=> navigate("/")}>
        retour
        </Button>
      
     
       
     
      </Form>
    </div>
  );
};

export default CreateCompte;
