import React from 'react';


class Login extends React.Component{

    state ={ 
        newAccount: false,
        newUser: {
            name: '',
            username: '',
            email: '',
            password: '',
            image_url: '',
        },
        login: {
            username: '',
            password: ''
        }
    }


    handleInputFieldChange=e=>{
        this.setState({newUser: {...this.state.newUser, [e.target.name]: e.target.value}})
    }

    handleLoginChange = e => {
        this.setState({login: {...this.state.login, [e.target.name]: e.target.value}})
    }


    loginForm = () => {

        return (
            <form onSubmit={this.handleSubmitLogin}>
                <div className="ui large form" id="login-form">
                <h2>Login</h2>
                <div className="two fields">
                  <div className="field">
                    <label>Username</label>
                    <input onChange={this.handleLoginChange} value= {this.state.login.username} name="username" id='login-input-1' className = "input" placeholder="Username" type="text"/>
                  </div>
                  </div>
                  <div className="two fields">
                  <div className="field">
                    <label>Password</label>
                    <input onChange={this.handleLoginChange} value= {this.state.login.password} name = "password" className = "input" placeholder="Password" type="text" onClick={(e)=>{e.target.type==='password' ? e.target.type='text' : e.target.type='password'}}/>
                  </div>
                </div>
               
                <button type='submit' className="ui submit grey button">Login</button>
              
                New to HomeHue?  <a href='' onClick={this.handleCreateAccountClick}>Create an account!</a>
              </div>
              </form>)

    }
    handleCreateAccountClick=(e)=>{
        e.preventDefault()
        this.setState(prevState=> ({newAccount: !prevState.newAccount}))
        // this.setState({newAccount: this})
    }

    handleSubmitLogin = e => {
        e.preventDefault()
        let user = this.props.users.find(user=> user.username === this.state.login.username)
        if (user){
           if (user.password === this.state.login.password){
                this.props.setCurrentUser(user)
                this.props.history.push('/')  
           } else {
                alert("incorrect password")
           }     
        } else {
         alert("Username not found")   
        }
        this.setState({login: {username: '', password: '' }})                        
    }

    toTitleCase= (str)=>{
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    handleSubmitAccount=e=>{
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                accept: 'application/json',
            'content-type': 'application/json'
            },
            body: JSON.stringify({

                name: this.toTitleCase(this.state.newUser.name),
                username: this.state.newUser.username.toLowerCase(),
                email: this.state.newUser.email,
                password: this.state.newUser.password,
                image_url: this.state.newUser.image_url
            
            })
        })
        .then(r=>r.json())
        .then(newUser=>{
            this.props.handleNewUser(newUser)
            this.props.setCurrentUser(newUser)
            this.props.history.push('/') 
            this.setState({ newUser: {
                name: '',
                username: '',
                email: '',
                password: '',
                image_url: '',
            }})
            
        })
        
    }

    createAccountForm = () => {
        const {name, username, password, email, image_url}=this.state.newUser
        return (    
        <form onSubmit={this.handleSubmitAccount} >
        <div className="ui large form" id="login-form" >
        <h2>Create an Account</h2>
        <div className="two fields">
          <div className="field">
            {/* <label>Name</label> */}
            <input onChange={this.handleInputFieldChange} name='name' value={name} className = "input" placeholder="Name" type="text"/>
           </div>
         
        </div>
            <div className="two fields">
                  <div className="field">
                    {/* <label>Username</label> */}
                    <input onChange={this.handleInputFieldChange}  name='username' value={username} className = "input" placeholder="Username" type="text"/>
                </div>
            </div>

            <div className="two fields">
                  <div className="field">
                    {/* <label>Email</label> */}
                    <input onChange={this.handleInputFieldChange}  name='email' value={email} className = "input" placeholder="Email" type="email"/>
                  </div>
            </div>

            <div className="two fields">
                  <div className="field">
                    {/* <label>Password</label> */}
                    <input onChange={this.handleInputFieldChange}  name='password' value={password} className = "input" placeholder="Password" type="text" onClick={(e)=>{e.target.type==='password' ? e.target.type='text' : e.target.type='password'}}/>
                </div>
            </div>

          <div className="two fields">
          <div className="field">
            {/* <label>Profile Picture</label> */}
           <input onChange={this.handleInputFieldChange}  name='image_url' value={image_url} className = "input" placeholder="Profile Image URL here...." type="text"/>
          </div>
        </div>
        
       
        <button className="ui submit grey button" type='submit'>Create Account</button>
      
        Already have an account with HomeHue?  <a href='' onClick={this.handleCreateAccountClick}>Login!</a>
      </div>
      </form>)

    }


    render(){
        
        return(
            <div className="login-page" >
            <img className = "login-logo" src="./Logo.png" alt="logo" />
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                {this.state.newAccount ? this.createAccountForm() : this.loginForm()}
                {/* <img className="design-image" src="./designPhoto3.png" alt ="design" /> */}
                </div>
            </div>
        )
    }
}

export default Login