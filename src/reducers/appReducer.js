export default function appReducer(state={message: 'Welcome to Balloon Learning! Are you ready to learn?', disableInstructions: false}, action){

  switch(action.type){

      case "FETCH_MESSAGE":

      return {...state, message: action.payload}

      case "DISABLE_INSTRUCTIONS":

      return {...state, disableInstructions: action.payload}

    default:
      return state
  }
}
