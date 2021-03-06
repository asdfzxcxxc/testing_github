import axios from "axios";
import { useEffect, useState } from "react";
import './/css/ManagerPage.css';
import { GivePersTeacher, DeleteTeacher, GivePersStudent, DeleteStudent } from "./service/ManagerPageService";

function ManagerPage() {
    const className = localStorage.getItem("className");
    const loginUserPers = localStorage.getItem("userPers");

    const [inputDataTeacher, setInputDataTeacher] = useState([{
        id: '',
        userName: '',
        userEmail: '',
        userAddress: '',
        userUniv: '',
        userMajor: '',
        userPers: ''
    }])

    const [inputDataStudent, setInputDataStudent] = useState([{
        id: '',
        userName: '',
        userEmail: '',
        userAddress: '',
        userUniv: '',
        userMajor: '',
        userPers: ''
    }])

    const [lastIdxTeacher, setLastIdxTeacher] = useState(0);
    const [lastIdxStudent, setLastIdxStudent] = useState(0);

    useEffect(async () => {
        try {
            await axios({
                url: 'http://44.194.225.221:8080/getClassMember',
                method: 'post',
                params: {
                    className: className
                }
            }).then((res) => {
                console.log(res.data);

                const teacher = res.data.teacher.map((rowData) => (
                    setLastIdxTeacher(lastIdxTeacher + 1),
                    {
                        id: rowData.id + 1,
                        userName: rowData.userName,
                        userEmail: rowData.userEmail,
                        userAddress: '-',
                        userUniv: '-',
                        userMajor: '-',
                        userPers: rowData.userPers
                    }
                ))
                console.log(teacher);
                setInputDataTeacher(inputDataTeacher.concat(teacher));

                const student = res.data.student.map((rowData) => (
                    setLastIdxStudent(lastIdxStudent + 1),
                    {
                        id: rowData.id + 1,
                        userName: rowData.userName,
                        userEmail: rowData.userEmail,
                        userAddress: rowData.userAddress,
                        userUniv: rowData.userUniv,
                        userMajor: rowData.userMajor,
                        userPers: rowData.userPers
                    }
                ))
                console.log(student);
                setInputDataStudent(inputDataStudent.concat(student));
            }).catch(function (error) {
                console.log(error.response.data);
            })
        } catch (e) {
            console.error(e.message);
        }
    }, [])

    if (loginUserPers === "3") {
        return (
            <table className="ManagerPageTable">
                <tbody>
                    <tr>
                        <th><h5>??????</h5></th>
                        <th><h5>??????</h5></th>
                        <th><h5>??????</h5></th>
                        <th><h5>??????</h5></th>
                        <th><h5>??????</h5></th>
                        <th><h5>??????</h5></th>
                        <th><h5>??????</h5></th>
                    </tr>
                    {lastIdxTeacher !== 0 ?
                        inputDataTeacher.map(rowData => (
                            rowData.id !== '' &&
                            <tr key= {rowData.id}>
                                <th><h5>??????</h5></th>
                                <td value={rowData.userName}>
                                    <h5>{rowData.userName}</h5>
                                </td>
                                
                                <td value={rowData.userAddress}>
                                    <h5>{rowData.userAddress}</h5>
                                </td>

                                <td value={rowData.userUniv}>
                                    <h5>{rowData.userUniv}</h5>
                                </td>

                                <td value={rowData.userMajor}>
                                    <h5>{rowData.userMajor}</h5>
                                </td>

                                {
                                    rowData.userPers === "0" ?
                                        <td value={rowData.id}>
                                            <button
                                                id={rowData.userEmail}
                                                className="decideButton"
                                                value="??????"
                                                onClick={(e) => GivePersTeacher(rowData.userEmail)
                                                }>??? ???</button>
                                        </td>
                                        : <td value={rowData.userPers}>
                                            <button
                                                className="decideButton"
                                                value="?????????"
                                                disabled>??? ???</button>
                                        </td>
                                }
                                <td>
                                    <button
                                        className="decideButton"
                                        value="??????"
                                        onClick={(e) => DeleteTeacher(rowData.userEmail)}
                                    >??????</button>
                                </td>
                            </tr>
                        )) :
                        <tr>
                            <td>????????? ????????? ????????????.</td>
                        </tr>
                    }
                    {lastIdxStudent !== 0 ?
                        inputDataStudent.map(rowData => (
                            rowData.id !== '' &&
                            <tr key= {rowData.id}>
                                <th><h5>??????</h5></th>

                                <td value={rowData.userName}>
                                    <h5>{rowData.userName}</h5>
                                </td>

                                <td value={rowData.userAddress}>
                                    <h5>{rowData.userAddress}</h5>
                                </td>

                                <td value={rowData.userUniv}>
                                    <h5>{rowData.userUniv}</h5>
                                </td>

                                <td value={rowData.userMajor}>
                                    <h5>{rowData.userMajor}</h5>
                                </td>
                                {
                                    rowData.userPers === "0" ?
                                        <td value={rowData.id}>
                                            <button
                                                id={rowData.userEmail}
                                                className="decideButton"
                                                value="??????"
                                                onClick={(e) => GivePersStudent(rowData.userEmail)}
                                            >??? ???</button>
                                        </td>
                                        : <td value={rowData.userPers}>
                                            <button
                                                className="decideButton"
                                                value="?????????"
                                                disabled
                                            >??? ???</button>
                                        </td>
                                }

                                <td>
                                    <button
                                        className="decideButton"
                                        value="??????"
                                        onClick={(e) => DeleteStudent(rowData.userEmail)}
                                    >??????</button>
                                </td>
                            </tr>
                        )) :
                        <tr>
                            <td>????????? ????????? ????????????.</td>
                        </tr>
                    }
                </tbody>
            </table>
        )
    } else {
        return (
            <div>
                ?????? ????????? ????????????.
            </div>
        )
    }
}

export default ManagerPage;