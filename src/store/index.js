import { createStore } from "redux";

const initState = {
    value: 0,
    name: "Syrym",
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    movies: [],
}

const reducer = function (state = initState, action) {
    const newState = { ...state }
    switch (action.type) {
        case 'counter/incremented':
            newState.value = state.value + 1
            break;
        case 'counter/decremented':
            newState.value = state.value - 1
            break;
        case 'todos/add':
            newState.todos = [...state.todos, action.payload]
            break;
        case 'todos/remove':
            newState.todos = state.todos.filter((todo) => todo.created !== action.payload)
            break;
        case 'todos/doneChange':
            newState.todos =  state.todos.map((todo) => {
                    if (todo.created === action.payload) {
                        return {
                            ...todo,
                            done: action.value
                        }
                    }
                    return todo
                })
            break;
        case 'set/movies':
          newState.value = [...state.todos, action.payload]
          break;
        default:
            return state
    }
    localStorage.setItem('todos', JSON.stringify(newState.todos))
    return newState
}

export const store = createStore(reducer)
