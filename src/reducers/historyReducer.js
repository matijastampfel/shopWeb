import * as firebase from 'firebase';
const database = firebase.database();

const historyReducer = (state = {

    actions: [],
    numberOfRegretables: 0

}, action) => {
    let newState = {...state}
        switch(action.type){

            case 'REGRET_ACTION':

           let newActions = newState.actions;
            for(let i=newState.actions.length-1; i>=0; i--){
                if(i>= action.payload) {

                    newActions.pop()
                }
            }
            newState.numberOfRegretables = newState.numberOfRegretables - action.regretableIndex;
            newState = {...newState, actions: newActions}
            return newState;
        }
    if(action.type!== 'REGRET_ACTION' && action.type!== '@@redux/INIT') {
        let newNumberOfRegretables= newState.numberOfRegretables;
        let newActionsList = state.actions;
        let bool;
        if (action.regretable === true) {
            bool = true
            newNumberOfRegretables++;
        }

        else {
            bool = false;

        }

        newActionsList.push(
            {
                message: action.type,
                regretable: bool,
                regretableIndex: newNumberOfRegretables,
                time: new Date ()
    }
    )



        newState = {...state, actions: newActionsList, numberOfRegretables: newNumberOfRegretables};


    }

    return newState;


}

export default historyReducer;
