import React, {Component} from 'react';
import fire from '../config/Fire';

class LoginRegister extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            data:JSON.parse(localStorage.getItem("User"))||[],
            email: '',
            password: '',
            fireErrors: '',
            formTitle: 'Login',
            loginBtn: true
        }
       
    }
   

    login = e => {
       // e.preventDefault();
        var users=JSON.parse(localStorage.getItem("User"));

        for(var j=0;j<users.length;j++)
        {
            if(users[j].username===this.state.email && users[j].pwd===this.state.password)
            {
               // alert('success');
               localStorage.setItem("cuser",JSON.stringify(users[j]))
               
            }
        }

       //fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        //.catch((error) => {
          //  this.setState({fireErrors: error.message})
        //});
    }
    
    register = e => {
        var userid=parseInt(localStorage.getItem("userid"))||1;
        e.preventDefault();
        const newUser={userid:userid,username:this.state.email,pwd:this.state.password,total:0}
        this.state.data.push(newUser);
        localStorage.setItem("User",JSON.stringify(this.state.data))

        userid+=1;
        localStorage.setItem("userid",userid);
        //fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        //.catch((error) => {
          //  this.setState({fireErrors: error.message})
        //});
    }

    getAction = action => {
        if(action === 'reg'){
            this.setState({formTitle: 'Register New User', loginBtn: false, fireErrors: ''});
        }else{
            this.setState({formTitle: 'Login', loginBtn: true, fireErrors: ''});
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
   

    render(){

        let errorNotification = this.state.fireErrors ? 
            ( <div className="Error"> {this.state.fireErrors} </div> ) : null;
        

            let submitBtn = this.state.loginBtn ? 
            (<input className="loginBtn" type="submit" onClick={this.login} value="Enter" />) : 
            (<input className="loginBtn" type="submit" onClick={this.register} value="Register" />);

        let login_register = this.state.loginBtn ?
        (<button className="registerBtn" onClick={() => this.getAction('reg')}>Register</button>) : 
        (<button className="registerBtn" onClick={() => this.getAction('login')}>Login</button>)


            

        return(
            <div className="form_block">
                <div id="title">{this.state.formTitle}</div>
                <div className="body">
                {errorNotification}
                    <form>
                        <input type="text" 
                        placeholder="Enter E-mail"
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        name="email" />

                        <input type="password" 
                        placeholder="Enter Password"
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        name="password" />

{submitBtn}
                    </form>
                    {login_register} 
                </div>
            </div>
        )
    }
}

export default LoginRegister;