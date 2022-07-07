import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, legacy_createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './reducers';

//internally middleware function called as logger(obj)(next)(action)
const logger = function ({dispatch,getState}) {
  return function(next) {
    return function (action) {
      //MW code
      if(typeof action != 'function') {
        console.log(action.type,'in MW');
      }
      
      next(action)
    }
  }
}
const thunk = function ({dispatch,getState}) {
  return function (next) {

    return function (action) {
      if(typeof action =='function') {
        action(dispatch);
        return;
      }
      next(action)
    }

  }
}
const store = legacy_createStore(rootReducer,applyMiddleware(logger,thunk));

export var StoreContext = createContext();

//connect function
export function connect(callback) {

  return function(Component) {
    class NewComponent extends React.Component{
      constructor(props) {
        super(props);
      }
      componentDidMount() {
        this.props.store.subscribe(()=>this.forceUpdate())
      }
      render() {
        var {store} = this.props;
        const state = store.getState()
        const dataNeededAsProps = callback(state)
        return(
              
              <Component 
              {...dataNeededAsProps} 
              dispatch={store.dispatch}/>
            
        )
      }
    }

    class NewComponentWrapper extends React.Component{
      render() {
        return (
          <StoreContext.Consumer>
            {(store)=> <NewComponent store={store}/>}
          </StoreContext.Consumer>
        )
      }
    }
    return NewComponentWrapper
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
