import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Join () {

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [checkPwd, setCheckPwd] = useState("");

    const navigate = useNavigate();

    const changeId = (event) => {
        setId(event.target.value);
    }

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changePwd = (event) => {
        setPwd(event.target.value);
    }
    
    const changeName = (event) => {
        setName(event.target.value);
    }

    const changeCheckPwd = (event) => {
        setCheckPwd(event.target.value);
    }

    // ID 중복 체크
	const checkIdDuplicate = async (event) => {

		if(id === ''){
			alert("아이디를 입력하세요.")
			return;
		}

		await axios.get("http://localhost:8080/user", { params: { id: id } })
			.then((resp) => {
				console.log("[Join.js] checkIdDuplicate() success :D");
				console.log(resp.data);

				if (resp.status == 200) {
					alert("사용 가능한 아이디입니다.");
				}
				
			})
			.catch((err) => {
				console.log("[Join.js] checkIdDuplicate() error :<");
				console.log(err);

				const resp = err.response;
				if (resp.status === 400) {
					alert(resp.data);
				}else if(resp.status === 500){
					alert("중복된 아이디입니다.")
				}
			});

	}

    // 회원가입
    const join = async () => {

		if(!pwd === checkPwd){
			alert("비밀번호를 확인해주세요.")
			return;
		}

		const req = {
			id: id,
			name, name,
			pwd: pwd,
			checkPwd: checkPwd,
			email: email
		}



		await axios.post("http://localhost:8080/user/join", req)
			.then((resp) => {
				console.log("[Join.js] join() success!");
				console.log(resp.data);

				alert(resp.data.id + "님 회원가입을 축하드립니다 🎊");
				navigate("/login");

			}).catch((err) => {
				console.log("[Join.js] join() error!");
				console.log(err);

				const resp = err.response;
				if (resp.status == 400) {
					alert(resp.data);
				}
			}
		);
    }

    return (
		<div>
			<table className="table">
				<tbody>
					<tr>
						<th className="col-2">아이디</th>
						<td>
							<input type="text" value={id} onChange={changeId} size="50px" /> &nbsp; &nbsp;
							<button className="btn btn-outline-danger" onClick={checkIdDuplicate}><i className="fas fa-check"></i> 아이디 중복 확인</button>
						</td>
					</tr>

					<tr>
						<th>이름</th>
						<td>
							<input type="text" value={name} onChange={changeName} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호</th>
						<td>
							<input type="password" value={pwd} onChange={changePwd} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호 확인</th>
						<td>
							<input type="password" value={checkPwd} onChange={changeCheckPwd} size="50px" />
						</td>
					</tr>

					<tr>
						<th>이메일</th>
						<td>
							<input type="text" value={email} onChange={changeEmail} size="100px" />
						</td>
					</tr>
				</tbody>
			</table><br />

			<div className="my-3 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={join}><i className="fas fa-user-plus"></i> 회원가입</button>
			</div>

		</div>
	)

}

export default Join;