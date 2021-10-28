import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ListPage() {
    const [formList, setFormList] = useState([]);

    useEffect(() => {
        axios.get("/api/form").then((result) => {
            setFormList(result.data);
        });
    }, []);

    return (
        <div>
            <h1>Form list</h1>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Form name</th>
                        <th>Submissions</th>
                        <th>Submit Page</th>
                    </tr>
                    {formList?.map((form, i) => {
                        return (
                            <tr key={i}>
                                <td>{form.id}</td>
                                <td>{form.formName}</td>
                                <td>{form.submissions}</td>
                                <td>
                                    <Link to={`/${form.id}`}>view submit</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Link to="/build">Create New Form</Link>
        </div>
    );
}

export default ListPage;
