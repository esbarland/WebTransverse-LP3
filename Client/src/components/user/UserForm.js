import React, { Component } from 'react';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ADD_USER = gql`
  mutation addUser($name: String! ,$pseudo: String!) {
    createUser(name: $name, pseudo: $pseudo)
  }
`;

function AddUser() {
  let name;
  let pseudo;
  const [addUser] = useMutation(ADD_USER);
  var history = useHistory();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addUser({ variables: { name: name.value, pseudo: pseudo.value } });
          name.value = '';
          pseudo.value = '';
          history.push('/');
        }}
      >
        <div className="form-group">          
          <label>Nom:</label>
          <input className="form-control" ref={node => { name = node; }} />
        </div>

        <div className="form-group">          
          <label>Pseudo:</label>
          <input className="form-control" ref={node => { pseudo = node; }} />
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