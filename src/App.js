import "./App.css";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import AppBody from "./components/app-body/app-body";

function App() {
	return (
		<div className="App">
			<NavBar></NavBar>
			<AppBody></AppBody>
			<Footer></Footer>
		</div>
	);
}

export default App;
