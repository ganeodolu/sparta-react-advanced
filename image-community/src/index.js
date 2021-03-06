import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./shared/App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { analytics } from "./shared/firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

function sendToAnalytics(metric) {
	const _report = JSON.stringify(metric);
	analytics.logEvent("web_vital_report", _report);
	console.log({ _report });
}

reportWebVitals(sendToAnalytics);
