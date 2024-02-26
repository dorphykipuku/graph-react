import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Navb = ()=>{

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleStrongClick = () => {
    setDropdownVisible(!dropdownVisible);
  };


  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Nouveau

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Nouveau

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('user');
      navigate('/');
    }
  };


    return(
        <div>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Urgence-App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <Link className="nav-item nav-link" to="/loc">
         Localiser poste
        </Link>
        <Link className="nav-item nav-link" to="/avis">
         voir-avis
        </Link>

        <div class="dropdown">
  <li className="nav-item nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   Admin
  </li>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" to="/sta">Statistiques</Link></li>
    <li><Link className="dropdown-item" to="/formp">Ajouter poste santé</Link></li>
  
  </ul>
</div>
       
     
      </ul>

      <div className="navbar-nav ml-auto">
        <div className="nav-item nav">
        <strong className="text" onClick={handleStrongClick}>
        {user && <div>{user.nom}</div>}
      </strong>

      {dropdownVisible && (
        <button type="button" onClick={handleLogout} className="btn btn-outline-danger">
          Déconnexion
        </button>
      )}
      </div>
    </div>
  </div>
  </div>
</nav>

        </div>
    );
}
export default Navb