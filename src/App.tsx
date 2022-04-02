import React from "react";
import { BrowserRouter } from "react-router-dom";

import IndexView from "~/views/IndexView";

import "~/styles/master.scss";


export default function App(): React.ReactElement {
	return (
		<BrowserRouter>
			<IndexView />
		</BrowserRouter>
	);
}
