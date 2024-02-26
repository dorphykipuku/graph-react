import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const ListPoste = () => {

    const [postes, setPostes] = useState([])
    const navigate = useNavigate()
   

    useEffect(()=>{
     HandleGetPostes()
    }, [])

    const HandleGetPostes=()=>{
        axios.get("http://localhost:8080/p")
        .then((res)=>{
            setPostes(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className='container'>
           
            <div className='card col-md-12 m-3'>
                <div className='card-header row'>
                   <h3 className='col-md-6'>Avis poste de santé</h3>
                   <button className='btn btn-success col-md-3' onClick={()=> navigate("/formavis")}> + laisser un avis</button>
                </div>
                <div className='card-body table-responsive'>
                  <table className='table'>
                   <thead>
                    <th>Poste de santé </th>
                    <th>type</th>
                    <th>services</th>
                    <th>adresse</th>
                    <th>contact</th>
                    <th>Operations</th>
                   </thead>
                   <tbody>
                    {postes.map((p)=>(
                        <tr key={p.idPoste}>
                            <td>{p.nomPoste}</td>
                            <td>{p.typePoste}</td>
                            <td>{p.services}</td>
                            <td>{p.adresse}</td>
                            <td>{p.telephone}</td>
                            <td><button className='btn btn-outline-success' onClick={()=> navigate(`/a/${p.idPoste}`)}>voir les avis</button></td>
                        </tr>
                    ))}
                   </tbody>
                  </table>
                </div>
            </div>
           
            <div className="row mt-5">
          <div className="col-md-12 text-center ">
            <footer>
              <p>&copy; 2023 Urgence-App. All Rights Reserved.</p>
            </footer>
          </div>
        </div>
        </div>
    );
};

export default ListPoste;