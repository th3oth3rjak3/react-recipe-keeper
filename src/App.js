import "./App.css";
import React from "react";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { ClockLoader } from "react-spinners";
const AppBody = React.lazy(() => import("./components/app-body/app-body"));

function App() {
	return (
		<>
			<NavBar />
			<React.Suspense
				fallback={
					<ClockLoader
						color={"#36D7B7"}
						cssOverride={{
							display: "block",
							margin: " 100px auto",
						}}
					/>
				}
			>
				<AppBody className="App" />
			</React.Suspense>
			<Footer />
		</>
	);
}

export default App;
