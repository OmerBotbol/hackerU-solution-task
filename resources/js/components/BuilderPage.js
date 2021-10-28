import React, { useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import "../../css/BuilderPage.css";

function BuilderPage() {
    const [questions, setQuestions] = useState([]);
    const [label, setLabel] = useState("");
    const [type, setType] = useState("");
    const [formName, setFormName] = useState("");
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState("");

    const addToQuestions = () => {
        if (!label || !type) {
            return setError("please enter label AND type");
        }
        setError("");
        const currentQuestions = [...questions];
        currentQuestions.push({ label, type });
        setQuestions(currentQuestions);
        setLabel("");
        setType("");
    };

    const handleSubmit = () => {
        /** http request to post the form */
        if (!formName || questions.length === 0) {
            return setError("you need to fill the form name AND questions");
        }
        setError("");
        const formData = { formName, questions };
        axios.post("http://127.0.0.1:8000/api/question", formData).then(() => {
            setIsFinished(true);
        });
    };

    if (isFinished) {
        return <Redirect to="/" />;
    }

    return (
        <div id="builder-page-container">
            <h1 id="builder-page-header">Create New Form</h1>
            <div id="form-name-container">
                <label className="name-label">Form Name: </label>
                <input
                    className="text-input"
                    type="text"
                    onChange={(e) => setFormName(e.target.value)}
                />
            </div>
            <div id="questions-container">
                <div id="question-data-container">
                    <div className="option-container">
                        <label className="name-label">label: </label>
                        <input
                            type="text"
                            value={label}
                            className="text-input"
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </div>
                    <div className="option-container">
                        <label className="name-label">type: </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="" disabled>
                                Select type
                            </option>
                            <option value="text">text</option>
                            <option value="date">date</option>
                            <option value="email">email</option>
                            <option value="tel">telephone</option>
                            <option value="number">number</option>
                        </select>
                    </div>
                    <div
                        className="custom-button"
                        onClick={() => addToQuestions()}
                    >
                        ADD
                    </div>
                    <div id="error-log">{error}</div>
                </div>
                <div>
                    <table id="question-table">
                        <tbody>
                            <tr>
                                <th className="table-header">Label</th>
                                <th className="table-header">type</th>
                            </tr>
                            {questions?.map((question, i) => {
                                return (
                                    <tr className="table-row" key={i}>
                                        <td className="table-line">
                                            {question.label}
                                        </td>
                                        <td className="table-line">
                                            {question.type}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div
                className="custom-button submit-button"
                onClick={() => handleSubmit()}
            >
                SUBMIT
            </div>
        </div>
    );
}

export default BuilderPage;
