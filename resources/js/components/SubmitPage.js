import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Redirect, useParams } from "react-router";
import "../../css/SubmitPage.css";

function SubmitPage() {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({});
    const [answers, setAnswers] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState("");
    const formId = useParams();

    useEffect(() => {
        Promise.all([
            axios.get(`/api/question/from/${formId.id}`),
            axios.get(`/api/form/${formId.id}`),
        ]).then((result) => {
            if (result[0].data === 0 || !result[1].data) {
                setError("Oops... Unable to find the form you asked");
            }
            setQuestions(result[0].data);
            setFormData(result[1].data);
        });
    }, [formId]);

    const handleChange = (answer, questionId, i) => {
        const answerArr = [...answers];
        answerArr[i] = { questionId, answer };
        setAnswers(answerArr);
    };

    const handleSubmit = () => {
        if (answers.length !== questions.length) {
            return setError("Please fill ALL fields");
        }
        setError("");
        const postData = {
            data: answers,
        };
        axios.post("/api/answer", postData).then(() => {
            axios
                .put(`/api/form/${formId.id}`, {
                    submissions: formData.submissions + 1,
                })
                .then(() => {
                    setIsFinished(true);
                });
        });
    };

    if (isFinished) {
        return <Redirect to="/" />;
    }

    if ((questions.length === 0 || !formData.formName) && !error) {
        return (
            <div className="loader-container">
                <Loader type="Oval" color="#77a6f7" height={100} width={100} />
            </div>
        );
    }

    if ((questions.length === 0 || !formData.formName) && error) {
        return (
            <div>
                <div
                    className="custom-button back-button"
                    onClick={() => setIsFinished(true)}
                >
                    BACK
                </div>
                <div id="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div
                className="custom-button back-button"
                onClick={() => setIsFinished(true)}
            >
                BACK
            </div>
            <h1 className="page-header">{formData.formName}</h1>
            <div className="form-container">
                {questions.map((question, i) => {
                    return (
                        <div key={i} className="form-section">
                            <label>{question.label}</label>
                            <input
                                className="text-input"
                                type={question.type}
                                onChange={(e) =>
                                    handleChange(e.target.value, question.id, i)
                                }
                            />
                        </div>
                    );
                })}
                <div className="error-log">{error}</div>
                <div
                    className="custom-button submit-button"
                    onClick={() => handleSubmit()}
                >
                    SUBMIT
                </div>
            </div>
        </div>
    );
}

export default SubmitPage;
