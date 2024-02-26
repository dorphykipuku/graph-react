import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const FormPost = ()=>{

const navigate = useNavigate()
  const [nomPoste, setnomPoste] = useState('')
  const [typePoste, setTypePoste] = useState('')
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [adresse, setAdresse] = useState('')
  const [services, setServices] = useState('')
  const [telephone, setTelephone] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault();
    const data ={nomPoste, typePoste, longitude, latitude, adresse, telephone, services};
    axios.post('http://localhost:8080/p', data)
    .then(response=>{
      alert('poste ajouté sur le Map ! ')
     navigate("/loc")
    }).catch(error=>{
        console.log("erreur")
    })
}


    return(
        <div className="container">
            <br/>
            <form onSubmit={handleSubmit}>
                <div className="row">
                <div className="form-group col-md-6">
    <label for="exampleInputEmail1">Nom poste santé</label>
    <input type="text" className="form-control" value={nomPoste} onChange={(e)=> setnomPoste(e.target.value)} aria-describedby="emailHelp" placeholder="nom poste santé"/>
  </div>
  <div className="form-group col-md-6">
    <label for="Longitude">Type poste santé</label>
    <input type="text" className="form-control" value={typePoste} onChange={(e)=> setTypePoste(e.target.value)} aria-describedby="emailHelp" placeholder="type poste"/>
  </div>
                </div>
                <div className="row">
                <div className="form-group col-md-6">
    <label for="exampleInputEmail1">Latitude</label>
    <input type="number" className="form-control" value={latitude} onChange={(e)=> setLatitude(e.target.value)} aria-describedby="emailHelp" placeholder="latitude du lieu"/>
  </div>
  <div className="form-group col-md-6">
    <label for="Longitude">Longitude</label>
    <input type="number" className="form-control" value={longitude} onChange={(e)=> setLongitude(e.target.value)} aria-describedby="emailHelp" placeholder="Longitude du lieu"/>
  </div>
                </div>
 <div className="row">
 <div className="form-group col-md-6">
    <label for="adresse">Adresse </label>
    <input type="text" className="form-control" value={adresse} onChange={(e)=> setAdresse(e.target.value)} id="exampleInputPassword1" placeholder="adresse"/>
  </div>
  <div className="form-group col-md-6">
    <label for="econtact">contact </label>
    <input type="text" className="form-control" value={telephone} onChange={(e)=> setTelephone(e.target.value)} id="exampleInputPassword1" placeholder="contact"/>
  </div>
 </div>
 <div className="form-group col-md-6">
    <label for="econtact">Services</label>
    <input type="text" className="form-control" value={services} onChange={(e)=> setServices(e.target.value)} id="exampleInputPassword1" placeholder="services"/>
  </div>
 

 <br/>
  <button type="submit" className="btn btn-primary">Ajouter</button>
</form>
        </div>
    )

}

export default FormPost