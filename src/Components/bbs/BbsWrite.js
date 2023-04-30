import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function BbsWrite (){

	const { auth, setAuth } = useContext(AuthContext)
	const { headers, setHeaders } = useContext(HttpHeadersContext);
	
    const navigate = useNavigate();
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");

	const changeTitle = (event) => {
		setTitle(event.target.value);
	}
	const changeContent = (event) => {
		setContent(event.target.value);
	}

	const fileList = [];

	/* [POST /bbs]: 게시글 작성 */
    const createBbs = async() => {
		const req = {
			id: localStorage.getItem("id"),
			title : title,
			content : content,
			fileList : fileList,
		}

		await axios.post("http://localhost:8080/bbs", req, {headers: headers})
		.then((resp) => {
			console.log("[BbsWrite.js] createBbs() success");
			console.log(resp.data);

			alert("게시물이 등록되었습니다.");
			navigate(`/bbsdetail/${resp.data.seq}`);
		})
		.catch((err) => {
			console.log("[BbsWrite.js] createBbs() Error");
			console.log(err);
		})

	}

	const filesUpload = (e) => {
		const files = Array.prototype.slice.call(e.target.files);
		
		files.forEach((uploadFile) => {
            fileList.push(uploadFile);
        });

		console.log(fileList);
	}

	useEffect(() => {
		if (!auth) {
			alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
			navigate(-1);
		}
	}, []);


	return (
		<div>
			<table className="table">
				<tbody>
					<tr> 
						<th className="table-primary">작성자</th>
						<td>
							<input type="text" className="form-control" value="admin" size="50px" readOnly />
						</td>
					</tr>
					<tr>
						<th className="table-primary">제목</th>
						<td>
							<input type="text" className="form-control" value={title} onChange={changeTitle} size="50px" />
						</td>
					</tr>
					<tr>
						<th className="table-primary">내용</th>
						<td>
							<input type="file" multiple={true} className="fileUpload" id="fileUpload"  onChange={filesUpload} style={{marginBottom:10}}/>
							<textarea type="text" className="form-control" value={content} onChange={changeContent} row="10" style={{height:300}}></textarea>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="my-5 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={createBbs}><i className="fas fa-pen"></i> 등록하기</button>
			</div>

		</div>
	);
};

export default BbsWrite;