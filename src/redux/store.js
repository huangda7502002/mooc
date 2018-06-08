import reducers from './reducers'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

export default createStore(reducers,compose(applyMiddleware(thunk),
  window.devToolsExtension? window.devToolsExtension(): f => f))