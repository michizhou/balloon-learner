export function fetchMessage(data){
  return {
    type: "FETCH_MESSAGE",
    payload: data
  }
}

export function disableInstructions(data){
  return {
    type: "DISABLE_INSTRUCTIONS",
    payload: data
  }
}
