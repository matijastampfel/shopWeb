import React, { Component } from 'react';

export default class History extends Component {

    render(){
        let newActionsList = this.props.historyState.actions
       

        newActionsList.sort((x, y) => {

            return new Date(y.time) - new Date(x.time);

        })

        let actions = newActionsList.map((action, key) => {

                return(
                    <li key={key} className="history-action">{action.message}


                    </li>
                )
            })







        return(


            <div className="history-container">

            <ul>
                {actions}
            </ul>


            </div>
        )
    }


}
