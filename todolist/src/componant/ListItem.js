import React from 'react'

function ListItem(props){
   // const items=localStorage.getItem('list')
    const items=props.Items;
    const listitems=items.map(item=>{
        return <div className="list" key={item.id}>
            <p>{item.text}<span data-key={props.index} onClick={() => props.deleteItem(item.key)}>Delete</span></p>
            
        </div>
    })

    return (
        <div>{listitems}</div>
    )

    

       
  }
export default ListItem