import React, { Component } from 'react';
import { Link } from "react-router-dom";


function LoginUser({ arg, pseudo, password }) {


  return (
    <div>

      
      <form>
        <div className="form-group">          
          <label>Pseudo:</label>
          <input className="form-control" ref={node => { pseudo = node; }} />
        </div>

        <div className="form-group">          
          <label>Mot de passe:</label>
          <input className="form-control" ref={node => { password = node; }} />
        </div>
        
        <div>
          <Link className="btn btn-danger text-white mr-2" to="/">Retour</Link>
          <button type="submit" className="btn btn-success">Connexion</button>
        </div>
      </form>


    </div>
  );
}

class UserForm extends Component {
    render() {
      return (
        <div>          
          <LoginUser />
        </div>
      );
    }
}

export default UserForm;