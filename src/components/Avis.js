import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Login.css'
const Avis = () => {
  const [avis, setAvis] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    handlegetAvis(id);
  }, [id]); // Ajoutez la dépendance id ici

  const handlegetAvis = (id) => {
    axios
      .get(`http://localhost:8080/a/avis/${id}`)
      .then((res) => {
        setAvis(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Avis</h1>

      {avis.map((a) => (
        <div key={a.id}>
          <div className="card mb-3" >
            <div className="card-header">
              <h5 className="mb-0">{a.utilisateur.nom}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">{a.commentaire}</p>
            </div>
            <div className="card-footer text-muted">
              <p className="mb-0">Publié le {a.dateAvis}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="row mt-5">
        <div className="col-md-12 text-center">
          <footer>
            <p>&copy; 2023 Urgence-App. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Avis;
