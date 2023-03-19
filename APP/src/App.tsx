import React from "react";
import Header from "./Components/Header/Header";
import AuthContextProvider from "./Context/AuthContext";
import AppRouter from "./Routes/AppRouter";
import "./App.scss";

function App() {
	return (
		<div className="main">
			<AuthContextProvider>
				<Header/>
				<div className="body-container">
					<AppRouter />
				</div>
				
			</AuthContextProvider>
		</div>

	);
}

export default App;
