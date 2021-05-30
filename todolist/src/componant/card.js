import React, { Component } from 'react'
import {v4 as uuid} from "uuid"; 
import '../ListItem.css'
import '../App.css'
import ListItem from './ListItem'
class Card extends Component
{
    constructor(props)
    {
        
        super(props);
        this.input=React.createRef()
       this.state={
           list:[],
          }  
    }
 
    

    addTask=()=>{
    
        const Items={
                id:uuid(),
                value:this.input.current.value,
                Date: new Date().toUTCString()
            };
    
            if(localStorage.getItem('list')==null){
                const list=[]
                list.push(Items);
                localStorage.setItem("list",JSON.stringify(list))
            }
            else{
                const list=JSON.parse(localStorage.getItem('list'))
                list.push(Items)
                localStorage.setItem("list",JSON.stringify(list))
            }
            this.setState({
                list:JSON.parse(localStorage.getItem('list'))
            });
        }
    
        componentDidMount() {
            const list = window.localStorage.getItem('list');
            const parsedList = JSON.parse(list);
            if(list == null){
                return false
            }
            else{
                this.setState({
                    list: parsedList,
                })
                console.log(this.state.list);
            }
        }   

    

        deleteItem=(event)=> {
        
            let index = event.target.getAttribute('data-key')
            let listValue=JSON.parse(localStorage.getItem('list'));
            listValue.splice(index,1)
            this.setState({list:listValue});
            localStorage.setItem('list',JSON.stringify(listValue))
        }
    
    render()
    {
        
        return (
            


            <div className="App">
              <header>
                <form id="to-do-form">
                  <input type="text" placeholder="Enter task" ref={this.input} ></input>
                  <button onClick={this.addTask}>Add</button>
                </form>
              </header>
             
              <ol>
                                {
                                    this.state.list.map((item,index)=>
                                    {
                                        return(
                                            <div className="list">
                                        <li key={item.id}> <span>{item.value}</span>
                                        <button style={{"border-radius":"5px","border":"0","backgroundColor":"rgba(255,0,0, 1)","marginLeft":"150px","height": "50px","width":"80px"}} type="button" value="delete" data-key={index} 
                                        onClick={this.deleteItem}>Delete</button></li>
                                        </div>
                                        )
                                    })
                                } 
                            </ol>
              
              
              

            </div>

        /*  <div className="main-container">
                <h1>Todo App...</h1>
                <hr/>
                <div className="container">
                    <input type="text" placeholder="AddTask..." ref={this.input}></input>
                        <button onClick={this.addTask} className="button" >Add</button>
                            
                </div>
                
            </div>*/
            
          );
    }
}

export default Card;