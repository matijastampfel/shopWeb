import React, { Component } from 'react';

export default class User extends Component {

    render(){

        return(

            <div>

                <span>{this.props.username}</span>

            </div>

        );
    };


}
