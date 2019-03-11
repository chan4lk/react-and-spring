import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

class App extends Component {

    state = {
        token: ''
    };

    componentDidMount() {
        this.signup();
    }

    signup = () => {
        const userName = makeid();
        fetch('/api/auth/signup', { method:'post', body: JSON.stringify({
            "name":"Chandima Ranaweera",
            "username":userName,
            "email":`${userName}@gmail.com`,
            "password":"Secret"
        }), 
        headers: {
        "Content-Type": "application/json"           
        }})
        .then(resp => resp.json())
        .then(data => {
            this.signin(userName);
        })
    }

    signin = (userName) => {
        fetch('/api/auth/signin', {           
            method:'post', 
            body: JSON.stringify({
                "usernameOrEmail":userName,
                "password":"Secret"
                }), 
            headers: {
            "Content-Type": "application/json"           
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                token : data.accessToken
            }, state => {
                setInterval(this.hello, 250);
            });
            
        })
    }

    hello = () => {
        if(this.state.token !== ''){
            fetch('/api/hello',{headers:{'Authorization':`Bearer ${this.state.token}`} })
                .then(response => response.text())
                .then(message => {
                    this.setState({message: message});
                });
        }
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">{this.state.message}</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;