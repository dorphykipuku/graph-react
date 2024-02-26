import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input as RsInput } from 'reactstrap';
import axios from 'axios';

import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // recuperer données 
    const { data : users } = await axios.get("http://localhost:8080/u");
    // verifier infos
    const user = users.find( user => user.email === email && user.password === password);

    if(user){
      // stocker infos dans le localstorage
      localStorage.setItem('user', JSON.stringify(user));

      navigate("/loc");
    } else{
      setError("email ou mot de passe incorrect")
    }

  };

  return (
    <div className="login-background">
      <Form className="login-form">
        <h2 className="text-center">Connexion</h2>
        <FormGroup>
          <Label for="email">E-mail ou numéro de téléphone</Label>
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
            type="password"
            name="password"
            id="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button color="success" className="mt-3" block onClick={handleLogin}>
          Connexion
        </Button>
        <p className="text-right">Besoin d'aide ?</p>
        <p>Nouveau sur Urgence-App ?  <Link to="/compte">créer un compte</Link></p>
     
      </Form>
    </div>
  );
};

export default Login;
