import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function BbsWrite (){

	const { auth, setAuth } = useContext(AuthContext)
	const { headers, setHeaders } = useContext(HttpHeadersContext);
	
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");
	const [fileList , setFilsList] = useState([]);

	const navigate = useNavigate();

	const changeTitle = (event) => { setTitle(event.target.value); }
	const changeContent = (event) => { setContent(event.target.value); }

	const filesUpload = (e) => {
		const files = e.target.files;
		const filesURL = [...fileList];

		for (let i = 0; i < files.length; i++) {
			const fileURL = URL.createObjectURL(files[i]);
			filesURL.push(fileURL);
		}

		setFilsList(filesURL);
		console.log(filesURL);
	}

	const deleteImage = (id) => {
		const newImageArray = fileList.filter((el, idx) => idx !== id);
		setFilsList([...newImageArray]);
		console.log(fileList);
	}

	/* [POST /bbs]: 게시글 작성 */
    const createBbs = async() => {
		const formData = new FormData();

		fileList.forEach((file) => {
            formData.append('multipartFiles', file);
        });

		const req = {
			id: localStorage.getItem("id"),
			title : title,
			content : content,
			fileList :fileList,
		}
		formData.append('req', JSON.stringify(req));

		if(title == ''){
			alert("제목을 입력하세요.");
			return;
		}

		await axios.post("http://localhost:8080/bbs", formData, {headers: headers})
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

	useEffect(() => {
		if (!auth) {
			alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
			navigate("/login");
		}
	}, []);


	return (
		<div>
			<table className="table">
				<tbody>
					<tr> 
						<th className="table-primary">작성자</th>
						<td>
							<input type="text" className="form-control" value={auth} size="50px" readOnly />
						</td>
					</tr>
					<tr>
						<th className="table-primary">제목</th>
						<td>
							<input type="text" className="form-control" value={title} onChange={changeTitle} size="50px" required/>
						</td>
					</tr>
					<tr>
						<th className="table-primary">내용</th>
						<td>
							<textarea type="text" className="form-control" value={content} onChange={changeContent} row="10" style={{height:300}}></textarea>
						</td>
					</tr>
				</tbody>
			</table>
			<div style={{width : 1000}}>
				<label
					htmlFor="input-file"
					className="fileUpload-label"
					onChange={filesUpload}
				>
					<input 
						type="file" 
						multiple={true} 
						className="fileUpload-input"
						id="fileUpload-input"
						accept="image/*"
					/>
				</label>

				{fileList.map((image, id) => (
					<div key={id}>
						<img src={image} alt={`${image}-${id}`} style={{width: 200, height: 100 , display: "inline-block"}}/>
						<button onClick={() => deleteImage(id)}>❌</button>
					</div>
      			))}
			</div>

			<div className="my-5 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={createBbs}><i className="fas fa-pen"></i> 등록하기</button>
			</div>

		</div>
	);
};

export default BbsWrite;