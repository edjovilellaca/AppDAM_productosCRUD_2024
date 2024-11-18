import { RouterProvider } from "react-router-dom";
import  Router from "./navigation/NaviRoutesCommerce";
import Footer from "./share/footers/components/Footer";

//FIC: import for redux
import { GET_DATA_START } from "./ecommerce/redux/thunks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function AppAllModules() {
	//FIC: objeto para heredar clase de dispath de redux.
	const dispatch = useDispatch();
	//FIC: para que solo entre la primera vez a cargar la data.
	useEffect(() => {
			dispatch(GET_DATA_START()).then(() => {
				//setLoading(false);
				console.log("<<END-DISPATCH>>: GET_DATA_START se ejecuto de forma correcta");
			});
	}, []);
	
    return (
		<>
			<div id='div-app'>
				<RouterProvider router={Router} />
				<div id='div-footer'>
					<Footer />
				</div>
			</div>
		</>	
	);
}