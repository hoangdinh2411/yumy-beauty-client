export const messageTypes ={
    ADD_MESSAGE : 'add message',
    CLEAR_MESSAGE: 'clear message'
}

const messageAction ={
    addMessage : (message)=>{
        return {
            type: messageTypes.ADD_MESSAGE,
            payload: message
        }
    },
    clearMessage : ()=>{
        return {
            type: messageTypes.CLEAR_MESSAGE,
        }
    }
}

export default messageAction