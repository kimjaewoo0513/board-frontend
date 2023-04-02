import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams , Link, useNavigate} from "react-router-dom";

function BbsDetail () {

    const [bbs, setBbs] = useState({});
	const { seq } = useParams(); // 파라미터 가져오기

    const navigate = useNavigate();

    const getBbsDetail =  async () => {
        await axios.get(`http://localhost:8080/bbs/${seq}`)
        .then((resp) => {
        console.log("[BbsDetail.js] getBbsDetail() success");
                console.log(resp.data);
                setBbs(resp.data.bbs);
        })
        .catch((err) => {
                console.log("[BbsDetail.js] getBbsDetail() error");
                console.log(err);
            });
    }

    useEffect(() => {
        getBbsDetail();
    }, []);

    const deleteBbs = async () => {
        await axios.delete(`http://localhost:8080/bbs/${seq}`)
        .then((resp => {
            console.log("[BbsDetail.js] deleteBbs() success");
			console.log(resp.data);

			if (resp.data.deletedRecordCount === 1) {
				alert("게시글을 성공적으로 삭제했습니다.");
				navigate("/bbslist");
			}
        }))
    }

    const updateBbs = {
		seq: bbs.seq,
		id: bbs.id,
		title: bbs.title,
		content: bbs.content
	}

    return (
        <div>
            <div className="my-3 d-flex justify-content-end">
                <>
                    {/* 자신이 작성한 게시글인 경우에만 수정 삭제 가능토록 추후 수정*/}
                    <Link className="btn btn-outline-secondary"  to="/bbsupdate" state={{ bbs: updateBbs }}><i className="fas fa-edit"></i> 수정</Link> &nbsp;
                    <button className="btn btn-outline-danger"  onClick={deleteBbs}><i className="fas fa-trash-alt"></i> 삭제</button>
                </>
            </div>
            <table className="table table-striped">
                <tbody>
                    <tr>
                        <th className="col-3">작성자</th>
                        <td>
                            <span>{bbs.id}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>제목</th>
                        <td>
                            <span>{bbs.title}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>작성일</th>
                        <td>
                            <span>{bbs.createdAt}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>조회수</th>
                        <td>
                            <span>{bbs.readCount}</span>
                        </td>
                    </tr>

                    <tr>
                        <th>내용</th>
                        <td>
                            <div>
                                {bbs.content}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="my-3 d-flex justify-content-center">
                <Link className="btn btn-outline-secondary" to="/bbslist"><i className="fas fa-list"></i> 글목록</Link>
            </div><br/><br/>
        </div>
    );
};

export default BbsDetail;