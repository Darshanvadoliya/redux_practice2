const initialstate = []

export function todo(state = initialstate, action) {


    switch (action.type) {
        case "ADD_TODO":
            return [...state, action.payload]
        case "REMOVE_TODO":
            return state.filter((todo) => todo.id !== action.payload.id)
        case "UPDATE_TODO":
            return state.map((todo) => (todo.id === action.payload.id ? action.payload : todo))
        case "RESTOR_TODO":
            return state.map((todo) => (todo.id === action.payload.id ? action.payload : todo))
        case 'PERMANENT_DELETE':
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state
    }
}


