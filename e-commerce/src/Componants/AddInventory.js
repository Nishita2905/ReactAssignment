import { createRef, react, Component } from 'react';
import { Form, Button, Table } from "react-bootstrap";
import LoginRegister from '../Componants/LoginRegister'
import axios from 'axios'
import { useParams } from 'react-router';
export default class AddInventory extends Component {
    i = 1;
    //total=parseInt(localStorage.getItem("total"))||0;
    total=0;
    constructor() {
        super();
        this.state = {
            products:JSON.parse(localStorage.getItem("products"))||[],
            cart:JSON.parse(localStorage.getItem("cart"))||[],
            setImage:null,
            data:JSON.parse(localStorage.getItem("cuser"))
        }
        
      this.formData = createRef();
        this.onImageChange = this.onImageChange.bind(this);
        this.go=this.go.bind(this);
    }
    onImageChange = event => {
        this.imageUpload(event)
       // console.log(event.target.files[0])
      };

    imageUpload = (e) => {
        const file = e.target.files[0];
        this.getBase64(file).then(base64 => {
           // this.state.setImage:base64;
           this.setState({
               setImage:base64
           })
            console.debug("file stored",base64);
        });
    };
     getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }


   go()
   {    
       localStorage.removeItem("cuser");

   }
    addtocart = (event, item) => {
        console.log(item.id)
        //console.log(event.target.value)
        //row get
        const indexOfArray = event.target.value;
        //console.log(this.state.products[indexOfArray]);
        var get = Number(prompt('Enter Quantity'));
        var actualquantity = this.state.products[indexOfArray].qty;
        if (get > actualquantity) {
            prompt("No enough Quantity");
        }
        if (get < actualquantity) 
        {
            let temp = 0;
            
           // this.total+=get*parseInt(item.price)
           //total
          // temp=parseInt(localStorage.getItem("cuser").total)||0;
          
          var totaldata=this.state.data.total;
          console.log(totaldata)
           
           totaldata+=parseInt(get)*parseInt(item.price)
           
          
            this.state.data.total=totaldata;
           
           localStorage.setItem("cuser",JSON.stringify(this.state.data))
           var user=JSON.parse(localStorage.getItem("User"));
            for(let i=0;i<user.length;i++)
            {
                if(user[i].userid==this.state.data.userid)
                {
                    user[i]=this.state.data
                    localStorage.setItem("User",JSON.stringify(user))
                    break;
                }
            }


            for (let j = 0; j < this.state.cart.length; j++)
            {
                
                console.log(this.total)
                 console.log(j);
                if (this.state.cart.some(item => this.state.products[indexOfArray].id == this.state.cart[j].id)) {
                    actualquantity = actualquantity - get;
                    console.log(actualquantity);
                    this.state.products[indexOfArray].qty = actualquantity;
                    this.setState({
                        products: this.state.products
                    });
                    localStorage.setItem("products",JSON.stringify(this.state.products));
                    var a = this.state.cart[j].qty;
                   // this.total=this.total-this.state.cart[j].qty
                    var b = a + get;
                    this.state.cart[j].qty = b;
                    this.setState(
                        {
                            cart: this.state.cart
                        }
                    )
                    temp = 1;
                    localStorage.setItem("cart",JSON.stringify(this.state.cart));
                    break;
                }
               
            }
      // localStorage.setItem("total",this.total);
            if(temp==0)
            {
                console.log("inside if");

              //  this.total=this.total+(parseInt(get)*parseInt(item.price))
                console.log(this.total)
                localStorage.setItem("total",this.total);


                actualquantity = actualquantity - get;
        console.log(actualquantity);
        this.state.products[indexOfArray].qty = actualquantity;
        this.setState({
            products: this.state.products
        });
        localStorage.setItem("products",JSON.stringify(this.state.products));
        var data=JSON.parse(localStorage.getItem("cuser"))
        const product = {
            cuserid:data.userid,
            id: this.state.products[indexOfArray].id,
            product_name: this.state.products[indexOfArray].product_name,
            product_desc:this.state.products[indexOfArray].product_desc,
            price: this.state.products[indexOfArray].price,
            qty: get
        }
        this.state.cart.push(product);
        localStorage.setItem("cart",JSON.stringify(this.state.cart));
        console.log(this.state.cart);

            }

            //  console.log(this.state.products[indexOfArray].id);           
            
            //  console.log(this.state.products);
            // localStorage.setItem("first",JSON.stringify(this.state.products));

        }
    }
    add = (event) => {
        
        var gid=JSON.parse(localStorage.getItem("globalid"))||1;
        
        event.preventDefault();
        var data=JSON.parse(localStorage.getItem("cuser"))
        //console.log(formData.current)
        const newProduct = {
            cuserid:data.userid,
            id:gid,
            product_name: this.formData.current.product_name.value,
            product_desc:this.formData.current.product_desc.value,
            price: this.formData.current.price.value,
            qty: Number(this.formData.current.qty.value),
            img: this.state.setImage,
            
        }
        // add a new product inside products array
        this.state.products.push(newProduct);
        this.setState({
            products: this.state.products
        });
        gid = gid + 1;
        localStorage.setItem("globalid",gid);
        localStorage.setItem("products",JSON.stringify(this.state.products));
        //console.log(newProduct);
    }

    delete=(event,item)=>
    {

        this.state.data.total-=(item.qty*item.price)
       // localStorage.setItem("total",this.total)

       localStorage.setItem("cuser",JSON.stringify(this.state.data))
       var user=JSON.parse(localStorage.getItem("User"));
        for(let i=0;i<user.length;i++)
        {
            if(user[i].userid==this.state.data.userid)
            {
                user[i]=this.state.data
                localStorage.setItem("User",JSON.stringify(user))
                break;
            }
        }


        event.preventDefault();
        const indexOfArray = event.target.value;
        
        for (let t = 0; t < this.state.products.length; t++)
        {
            if (this.state.products.some(item => this.state.cart[indexOfArray].id == this.state.products[t].id)) 
            {
                this.state.products[t].qty=this.state.products[t].qty+this.state.cart[indexOfArray].qty;
                this.setState
                ({
                    products: this.state.products
                });
                localStorage.setItem("products",JSON.stringify(this.state.products));
              //  const newCountries = [...this.state.cart];
               break;
                
            }            

        }
        this.setState({cart: this.state.cart.filter(c=>c.id!==item.id)});
        localStorage.setItem("cart",JSON.stringify(this.state.cart.filter(c=>c.id!==item.id)));

    }
    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <center><b><u><i><h4 style={{color:"blue",marginLeft:"30%"}}>New Product</h4></i></u></b></center>
                <Form style={{"marginLeft":"5%","width":"400px"}} onSubmit={this.add} ref={this.formData}>
                    <Form.Group controlId="formBasicProductName">
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Product Name" name="product_name" />
                    </Form.Group>

                    <Form.Group controlId="formdescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" name="product_desc" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPrice">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="number" placeholder="Price in Rs." name="price" />
                    </Form.Group>

                    <Form.Group controlId="formBasicQty">
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control type="number" placeholder="How many: qty" name="qty" />
                    </Form.Group>

                    <Form.Group controlId="formBasicQty">
                        <Form.Label>img:</Form.Label>
                        <Form.Control onChange= {(e) => this.imageUpload(e)} type="File" placeholder="How many: qty" name="img" />
                    </Form.Group>

                    
                    
                    <Button variant="primary" type="submit">
                        Add to Product List
                    </Button>
                    
                </Form>
                </div>
                <div style={{ "width": "63%","margin-left":"9%" }} className="col-md-9">
                    
                <b><u><i><h4 style={{color:"blue","margin-left":"40%"}}>Product List</h4></i></u></b>
               
                
                
                <Table striped bordered hover variant="dark">
                
                <thead>
                       <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Price</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((item, index) => {
                                var path = item.img;
                                //var newpath="src/assets/Images"+path.split('\\').pop();
                                // localStorage.setItem("first",JSON.stringify(this.state.products));
                                return (
                                    <tr key={index}>
                                        <td style={{width:"17%"}}>{item.id}</td>
                                        <td style={{width:"17%"}}>{item.product_name}</td>
                                        <td style={{width:"17%"}}>{item.product_desc}</td>
                                        <td style={{width:"17%"}}>{item.price}</td>
                                        <td style={{width:"17%"}}>{item.qty}</td>
                                        <td><img src={item.img} style={{"width":"40px","Height":"40px"}}></img></td>
                                        <td style={{width:"17%"}}>
                                            <button variant="primary" style={{marginLeft:"5%"}} className="btn btn-success" onClick={event => this.addtocart(event, item)} value={index}>AddtoCart</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                
                </div>
                <b><u><i><h4 style={{color:"blue","margin-left":"10%"}}>Add to cart</h4></i></u></b>
                <Table striped bordered hover variant="dark" style={{ "width": "31%","marginLeft":"2%" }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Name:</th>
                            <th>Product Description:</th>
                            <th>Price</th>
                            <th>Qty</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.cart.map((item, index) => {
                              //  localStorage.getItem("",JSON.stringify(this.state.products));
                              
                                var data=JSON.parse(localStorage.getItem("cuser"));
                               
                                    if(item.cuserid===data.userid)
                                    {
                                        
                                        console.log("inside if")
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.product_name}</td>
                                                <td>{item.product_desc}</td>
                                                <td>{item.price}</td>
                                                <td>{item.qty}</td>
                                                <td>
                                                    <button variant="success" onClick={event => this.delete(event,item)} value={index}>Delete</button>
                                                </td>
                                               
                                               
                                            </tr>
                                           
                                        )   
                                }
                            })    
                        }                
                    </tbody>                
                </Table>                
                Total:{this.state.data.total}
            </div>
        )
    }
}