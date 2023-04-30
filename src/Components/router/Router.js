import { Routes, Route } from "react-router-dom";

import Home from "../app/Home"

import BbsList from "../bbs/BbsList"
import BbsDetail from "../bbs/BbsDetail"
import BbsWrite from "../bbs/BbsWrite"
import BbsUpdate from "../bbs/BbsUpdate"
import BbsAnswer from "../bbs/BbsAnswer"

import Join from "../member/Join"
import Login from "../member/Login"
import Logout from "../member/Logout"



function Router() {

	return (
			<Routes>
				<Route path="/" element={<Home />}></Route>
				
				<Route path="/bbslist" element={<BbsList />}></Route>
				<Route path="/bbsdetail/:seq" element={<BbsDetail />}></Route>
				<Route path="/bbswrite" element={<BbsWrite />}></Route>
				<Route path="/bbsupdate" element={<BbsUpdate />}></Route>
				<Route path="/bbsanswer/:parentSeq" element={<BbsAnswer />}></Route>

				<Route path="/join" element={<Join />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/logout" element={<Logout />}></Route>
			</Routes>
	);
}

export default Router;