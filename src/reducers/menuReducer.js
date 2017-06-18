const menuReducer = (state = {
    view: 'productsview',
    authenticated: false,
    authText: 'Log In'
}, action ) => {
    let newState = {...state};
    switch(action.type){

        case 'CHANGE_VIEW':
            newState = {...newState, view: action.payload.target.id};
            return newState;

        case 'LOG_IN':
            newState.authenticated = true;
            newState.authText = 'Log Out';
            return newState;

            case 'LOG_OUT':

                newState.authenticated = false;
                newState.authText = 'Log In';

            return newState;



        default:
            return newState;



    }

}

export default menuReducer;
