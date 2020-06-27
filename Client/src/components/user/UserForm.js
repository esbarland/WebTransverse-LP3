import React, { Component } from 'react';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ADD_USER = gql`
  mutation addUser($pseudo: String! ,$password: String!) {
    createUser(pseudo: $pseudo, password: $password){
      pseudo
    }
  }
`;

function AddUser() {
  let pseudo;
  let password;
  const [addUser] = useMutation(ADD_USER);
  var history = useHistory();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addUser({ variables: { pseudo: pseudo.value, password: password.value } });
          pseudo.value = '';
          password.value = '';
          history.push('/');
        }}
      >
        <div className="form-group">          
          <label>Pseudo:</label>
          <input className="form-control" ref={node => { pseudo = node; }} />
        </div>

        <div className="form-group">          
          <label>Mot de passe:</label>
          <input type="password" className="form-control" ref={node => { password = node; }} />
        </div>
        
        <div>
            <Link className="btn btn-danger text-white mr-2" to="/">Retour</Link>
          <button type="submit" className="btn btn-success">Créer un compte utilisateur</button>
        </div>
      </form>
    </div>
  );
}

class UserForm extends Component {
    render() {
      return (
        <div>
          <AddUser />
        </div>
      );
    }
}

export default UserForm;