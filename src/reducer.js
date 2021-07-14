const reducer=(state,action)=>{
switch (action.type) {
    case "add":
        return {...state,randNum:action.data}
    case "wrong":
        return {...state,wrongAns:[...state.wrongAns,action.data]}
    default:
        break;
}
}

export default reducer