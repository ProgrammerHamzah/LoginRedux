const initialState={
    user:{
        name:null
    }
}
const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'UPDATE_USER':
            return{
                ...state,
                user:{
                    ...state.user,
                    name:action.payload
                }
            }
            default:
                return state
    }
}
export default userReducer