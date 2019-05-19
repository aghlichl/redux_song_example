//action creator which return POJO actions


const createPolicy = (name, amount) => {
    return{
        type: 'CREATE_POLICY', 
        payload: {
            name: name, 
            amount: amount
        }
    }
}

const deletePolicy = (name) => {
    return{
        type: 'DELETE_POLICY',
        payload: {
            name: name
        }
    }
}

const createClaim = (name, amountOfMoneyToCollect) => {
    return {
        type: 'CREATE_CLAIM',
        payload: {
            name: name, 
            amountOfMoneyToCollect: amountOfMoneyToCollect
        }
    }
}


//reducers
// oldListOfClaims = [], in case its the first call
const claimsHistory = (oldListOfClaims = [], action) => {
    if(action.type === 'CREATE_CLAIM'){
        //we care, spread operator for non-nested array
        //immutable store
        return [...oldListOfClaims, action.payload];
    }
    //we dont care
    return oldListOfClaims;
}

const accounting = (bagOfMoney = 100, action) => {
    if(action.type === 'CREAT_CLAIM'){
        return bagOfMoney - action.payload.amountOfMoneyToCollect
    }
    else if(action.type === 'CREATE_POLICY'){
        return bagOfMoney + action.payload.amount
    }
    return bagOfMoney;
}

const policies = (listOfPolicies = [], action) => {
    if(action.type === 'CREATE_POLICY'){
        return [...listOfPolicies, action.payload.name];
    }
    else if(action.type === 'DELETE_POLICY'){
        return listOfPolicies.filter(name  => {
            return name !== action.payload.name
        })
    }
    return listOfPolicies
}


//Redux Store
const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
    accounting: accounting, 
    claimsHistory: claimsHistory, 
    policies: policies
});

const store = createStore(ourDepartments)

store.dispatch(action);
store.getState();

