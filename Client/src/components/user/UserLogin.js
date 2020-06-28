import React, { Component } from 'react';
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_USERS = gql`
  {
    users{
      _id 
      pseudo
      password
    }
  }
`;

function LoginUser({ arg, pseudo, password }) {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Chargement...";
  if (error) 
    return (
      <div className="alert alert-danger" role="alert">
        Erreur ! {error.message}
      </div>
    );

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

      
      {data.users.map(item =>
          <div key={item._id}>
            {item.pseudo} - {item.password}
          </div>
        )}
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