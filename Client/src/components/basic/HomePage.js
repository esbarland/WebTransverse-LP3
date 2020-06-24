import React, { Component } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_GRAPHQL_INFO = gql`
  {
    userSchemaAssert
  }
`;

function CheckConfig() {
  const { loading, error } = useQuery(GET_GRAPHQL_INFO);

  if (loading) return <span className="status-warning">Loading ...</span>;
  if (error) return <span className="status-error">Error</span>;
  return <span className="status-ok">Ok</span>;
}

class HomePage extends Component {
    render() {
      return (
        <div className="text-center">
          <h1>Bienvenue sur le site de gestionnaire de tâches !</h1>

          <div>
            GraphQL status: <CheckConfig />
          </div>
        </div>
      );
    }
}

export default HomePage;