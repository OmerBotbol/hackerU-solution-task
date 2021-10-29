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
    const formId = useParams();

    useEffect(() => {
        Promise.all([
            axios.get(`http://127.0.0.1:8000/api/question/from/${formId.id}`),
            axios.get(`http://127.0.0.1:8000/api/form/${formId.id}`),
        ]).then((result) => {
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
        if (answers.length === questions.length) {
            /** http request to post the answers to the server */
            const postData = {
                data: answers,
            };
            axios
                .post("http://127.0.0.1:8000/api/answer", postData)
                .then(() => {
                    axios
                        .put(`http://127.0.0.1:8000/api/form/${formId.id}`, {
                            submissions: formData.submissions + 1,
                        })
                        .then(() => {
                            setIsFinished(true);
                        });
                });
        }
        console.log("missing answers");
    };

    if (questions.length === 0 || !formData.formName) {
        return (
            <div className="loader-container">
                <Loader type="Oval" color="#77a6f7" height={100} width={100} />
            </div>
        );
    }

    if (isFinished) {
        return <Redirect to="/" />;
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
