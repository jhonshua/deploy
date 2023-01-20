import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "./reducer"

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



//creamos nuestra store la configuramos

/*

El store contiene todo el árbol de estado de tu aplicación. La única forma de cambiar el
estado que contiene es despachando una acción.


*/ 