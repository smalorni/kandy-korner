import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/* Goal: create a form, for creating new objects, only employees can do it. Once POST operation is completed, navigate user back to list of all products. */

export const ProductForm = () => {
    
    const [product, update] = useState({
        name: "",
        productTypeId:"",
        price:""
})
    
    const navigate = useNavigate()
   
    const [productTypes, setProductTypes] = useState([])

    
    useEffect(
        () => {
            console.log(productTypes)
        },
        [productTypes]
    )

    useEffect(
        () => {
            fetch("http://localhost:8088/productTypes")
            .then(response => response.json())
            .then((productTypeArray) => {
                setProductTypes(productTypeArray)
            })
        },
        []
    )
    
    
    
    /* Function that stores data when submit ticket is clicked on, need to create onclick */

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /* Need send data to API */

        const productToSendToAPI = {
            name: product.name,
            productTypeId: parseInt(product.productTypeId), //parseInt 
            price: parseFloat(product.price,2) //2 is the decimal places
        }

        /* Post request to JSON server, when completed, navigate user back to product list - route found in application views.js */

        return fetch('http://localhost:8088/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify(productToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/products") //same as shown in application views
        })
    }

        return (
            <form className="productForm">
                <h2 className="productForm_title">New Product Form</h2>
                <fieldset>
                    <div className="form-group-name" key={product.id}>
                        <label htmlFor="name">Name of Product:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Enter name of product"
                                value={product.name}
                                onChange={
                                    (evt) => {
                                        const copy = {...product} //created a copy of existing state
                                            copy.name = evt.target.value //to modify
                                            update(copy)
                                        }
                                     } />
                                    
                    </div>
                </fieldset>
                
                <fieldset>
                <div className="form-group-category">
                    <label htmlFor="productType">Choose Product Type:</label>
                    {
                        productTypes.map((productType) => {
                              return <div className="product-form">
                                <input 
                                required autofocus
                                onChange={(changeEvent) => {
                                    const copy = {...product}
                                    copy.productTypeId = parseInt(changeEvent.target.value)
                                    update(copy)
                                }}
                            
                                type="radio" name="productType" value ={productType.id}
                                /> { ""}
                                {productType.category}
                                </div>
                                })}
                                                
                </div>
                </fieldset>
            
                <fieldset>
                    <div className="form-group-price">
                        <label htmlFor="price">Price of Product:</label>
                            <input
                                required autoFocus
                                type="number"
                                placeholder="Price"
                                value={product.price}
                                onChange={
                                    (evt) => {
                                        const copy = {...product}
                                        copy.price = evt.target.value
                                        update(copy)
                                    }
                                }
                            />
                    </div>
                </fieldset>
               

                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="button-add-product">
                    Add New Product
                    </button>
            </form>
        )
    }

  