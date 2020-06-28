import React, { Component } from 'react';

class Status extends Component {
    constructor(props){
        super(props);
        this.state = { status: props.status };
    }

    render() {
      return (
        <div>
            <span className="mr-2">Status:</span> 
            {this.state.status === 0 && <span className="badge badge-warning">En cours</span>}
            {this.state.status === 1 && <span className="badge badge-success">Terminé</span>}
            
            {this.state.status !== 1 && this.state.status !== 0 && <span className="badge badge-secondary">Sans status</span>}
        </div>
      );
    }
}

export default Status;