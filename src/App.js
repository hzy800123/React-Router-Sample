import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';

// match 对象包含的信息如下：
// isExact: true                - 返回布尔值，如果准确（没有任何多余字符）匹配则返回true
// params: {userName: "john"}   - 返回一个对象，包含Path-to-RegExp包从URL解析的“键值对”
// path: "/user/:userName"      - 用于匹配路径模式
// url: "/user/john"            - 返回URL中匹配部分的字符串
const User = ({userName}) => {
  return (<h1>This is User page for {userName}</h1>)
}

class App extends Component {
  state = {
    loggedIn: false
  }

  loginHandle = () => {
    this.setState(
      // { loggedIn: !this.state.loggedIn }
      (prevState) => {
        return {loggedIn: !prevState.loggedIn}
      }
    )
  }

  render() {
    const promptMsg = 'Are you sure go to '

    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <NavLink to='/' exact activeStyle={{color: 'red'}}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/about' exact activeStyle={{color: 'red'}}>Abount</NavLink>
            </li>
            <li>
              <NavLink to='/user/John' exact activeStyle={{color: 'red'}}>User John</NavLink>
            </li>
            <li>
              <Link to='/user/Peter'>User Peter</Link>
            </li>
          </ul>
          
          <Prompt
            when={!this.state.loggedIn}
            message={(location) => {              
              return ( location.pathname.startsWith('/user') ?
                        promptMsg.concat(location.pathname) :
                        true
              )
            }}
          />

          <input 
            type='button' 
            value={this.state.loggedIn ? 'Log Out' : 'Log in'} 
            onClick={this.loginHandle.bind(this)}
          />

          <Switch>
            <Route path='/' exact strict render={
              () => {
                return (<h1>This is Home page</h1>)
              }
            }/>
            <Route path='/about' exact strict render={
              () => {
                return (<h1>This is About page</h1>)
              }
            }/>
            <Route path='/user/:userName' exact strict 
              render={({match}) => (
                this.state.loggedIn ? 
                <User userName={match.params.userName}/> :
                <Redirect to='/'/>
              )}
            />
            <Route render={
              () => {
                return (<h1>This page is not found - 404</h1>)
              }
            }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
