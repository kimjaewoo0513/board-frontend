import { Routes, Route } from "react-router-dom";

import Home from "../app/Home"
import BbsList from "../bbs/BbsList"
import BbsDetail from "../bbs/BbsDetail"
import BbsWrite from "../bbs/BbsWrite"
import BbsUpdate from "../bbs/BbsUpdate"
import Join from "../member/Join"
import Login from "../member/Login"



function Router() {

	return (
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/bbslist" element={<BbsList />}></Route>
				<Route path="/bbsdetail/:seq" element={<BbsDetail />}></Route>
				<Route path="/bbswrite" element={<BbsWrite />}></Route>
				<Route path="/bbsupdate" element={<BbsUpdate />}></Route>

				<Route path="/join" element={<Join />}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
	);
}

export default Router;