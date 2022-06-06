import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const Products = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [expensive, setExpensive] = useState([false])
    
/* Steps: 
    1. To get user honey obj of local storage 
    2. Currently a string so need to convert to an obj */
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const navigate = useNavigate()

    /* Fetch all existing data, sort by name - included "&" to get the category for product type */
    useEffect (
    () => {
        fetch("http://localhost:8088/products?_sort=name&_expand=productType")
        .then(response => response.json())
        .then((productArray) => { 
            setProducts(productArray) //passes what you want the new value to be
        })

    },
    [] //when this array is empty, you are observing initial component state

)

useEffect(
    () => {
        setFiltered(products)
    },
    [products]
)

useEffect(
    () => {
        if(expensive) {
            const expensiveProducts = products.filter(product => product.price > 2)
            setFiltered(expensiveProducts)
        } else {
            setFiltered(products)
        }
    },
    [expensive]
)

/* JSX is displaying state/elements - you need this section below in order for the info to appear on the UI in browser */

return <>
    {
    
       kandyUserObject.staff
       ? <>
       <button onClick={() => {setExpensive(true)}}>Top Priced</button>
       <button onClick={() => navigate("/product/add")}>Add New Product</button>
       <button onClick={() => {setExpensive(false)}}>Show All Products</button>
       </>
       : null
    }


    <h2>List of Products</h2>
        <section className="products">
            {
                filteredProducts.map
                ((filteredProduct) => {
                    return <div class="product" key={filteredProduct.id}>
                        <p>Name: {filteredProduct.name}</p>
                        <p>Price: {filteredProduct.price.toLocaleString("en-US", { style: "currency", currency: "USD"})}</p>
                        <p>Product Type: {filteredProduct.productType.category}</p> 
                        
                    </div>
                }
            )
        }

        </section>
    </>
}