import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import "../../css/ListPage.css";

function ListPage() {
    const [formList, setFormList] = useState([]);
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() => {
        axios.get("/api/form").then((result) => {
            setFormList(result.data);
        });
    }, []);

    if (isRedirect) {
        return <Redirect to="/build" />;
    }

    return (
        <div id="list-page-container">
            <h1 id="list-page-header">Form list</h1>
            <div id="table-container">
                <table id="list-table">
                    <tbody>
                        <tr>
                            <th className="table-header">ID</th>
                            <th className="table-header">Form name</th>
                            <th className="table-header">Submissions</th>
                            <th className="table-header">Submit Page</th>
                        </tr>
                        {formList?.map((form, i) => {
                            return (
                                <tr key={i}>
                                    <td className="table-line">{form.id}</td>
                                    <td className="table-line">
                                        {form.formName}
                                    </td>
                                    <td className="table-line">
                                        {form.submissions}
                                    </td>
                                    <td className="table-line">
                                        <Link
                                            className="submit-link"
                                            to={`/${form.id}`}
                                        >
                                            view submit
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div
                    className="custom-button"
                    onClick={() => setIsRedirect(true)}
                >
                    Create New Form
                </div>
            </div>
        </div>
    );
}

export default ListPage;
