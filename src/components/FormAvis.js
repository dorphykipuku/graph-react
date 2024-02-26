// Formulaire.js
import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Form.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAvis = ({ onUserSelect }) => {
  const [dateAvis, setDateAvis] = useState('');
  const [posteSanteId, setPosteSanteId] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [dataposte, setDataposte] = useState([])
  const [utilisateurId, setUtilisateurId] = useState('');
  const navigate = useNavigate()


  useEffect(()=>{
    axios.get("http://localhost:8080/p")
    .then(response=>{
        setDataposte(response.data)
    })
    .catch(error=>{
        console.error('erreur');
    })
}, []);


const handleUserChange = (e) => {
  // Récupérez la valeur sélectionnée du champ
  const selectedUserId = e.target.value;

  // Mettez à jour l'état avec la nouvelle valeur
  setUtilisateurId(selectedUserId);
};

const [userId, setUserId] = useState(null);

useEffect(() => {
  // Récupérer la valeur depuis le stockage local lors du montage du composant
  const userString = localStorage.getItem('user');
  
  if (userString) {
    const user = JSON.parse(userString);
    setUserId(user.id);
  }
}, []); 

  const handleSubmit = (e)=>{
    e.preventDefault();
    const data ={dateAvis, posteSanteId, commentaire, userId};
    axios.post('http://localhost:8080/a/'+posteSanteId+'/'+userId, data)
    .then(response=>{
      alert('votre avis ajouté avec succès ! ')
     navigate("/avis")
    }).catch(error=>{
        console.log("erreur")
    })
}

  return (
    <Form onSubmit={handleSubmit} className="mx-auto mt-5 col-md-7">
      <FormGroup>
        <Label for="date">Date:</Label>
        <Input type="date" id="date" value={dateAvis} onChange={(e) => setDateAvis(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="comment">Avis ou Commentaire:</Label>
        <Input type="textarea" id="comment" value={commentaire} onChange={(e) => setCommentaire(e.target.value)} />
      </FormGroup>
      <FormGroup>
  <Label for="posteSante">Poste de santé:</Label>
  <Input
    type="select"
    id="posteSante"
    value={posteSanteId}
    onChange={(e) => setPosteSanteId(e.target.value)}
  >
    <option value="">Sélectionnez une poste santé</option>
    {dataposte.map((dat) => (
      <option key={dat.idPoste} value={dat.idPoste}>
        {dat.nomPoste}
      </option>
    ))}
  </Input>
</FormGroup>

      <FormGroup>
        <Label for="user">Information utilisateur:</Label>
        <Input type="select" onChange={handleUserChange} id="user">
          {localStorage.getItem('user') && (
            <option value={JSON.parse(localStorage.getItem('user')).id}>
              {JSON.parse(localStorage.getItem('user')).nom}
            </option>
          )}
        </Input>
      </FormGroup>
      <Button type="submit" color="primary">Soumettre</Button>
    </Form>
  );
};

export default FormAvis;
