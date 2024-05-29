import React, { createContext, useContext, useReducer } from 'react';

const TodoStateContext=createContext();
const TodoDispatchContext=createContext();
const reducer=(state,action)=>{
switch(action.type){
    case "ADD":
      return [...state, { id: action.id, name: action.name}];
    
    case "REMOVE":
        let newArr=[...state]
        newArr.splice(action.index,1)
        return newArr;
    
    case 'UPDATE':
        const updatedCart = state.map(item => {
            if (item.id === action.id) {
                return { ...item };
              }
              return item;
            });
        return updatedCart;
    default:
        console.log("this is ok")
        return state;

}
}
export const TodoProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,[])
    return(
<TodoDispatchContext.Provider value={dispatch}>
    <TodoStateContext.Provider value={state}>
        {children}
    </TodoStateContext.Provider>
</TodoDispatchContext.Provider>
    )
}
export const useCart=()=>useContext(TodoStateContext);
export const useDispatchCart = () => useContext(TodoDispatchContext);
