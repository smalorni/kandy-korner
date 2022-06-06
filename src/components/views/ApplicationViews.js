import { Outlet, Route, Routes } from "react-router-dom"
import { Locations } from "../Locations/locations"
import { ProductForm } from "../Products/productForm"
import { Products } from "../Products/products"

/* You definitely need the outlet to render this */
/* Route path is name of file, inside curly brackets is function name */
export const ApplicationViews = () => {
	return ( 
		<Routes>
			<Route path="/" element={
				<>
					<div class="header">
						<h1 className="title">Kandy Korner</h1>
							<h3>Willy Wonka Can't Beat Us</h3>
							<Outlet />
					</div>
				</>
			}>
				<Route path="locations" element= { <Locations />} />
				<Route path="products" element= { <Products />} />
				<Route path="product/add" element={ <ProductForm />} />

			</Route>
		</Routes> 
	)
}


