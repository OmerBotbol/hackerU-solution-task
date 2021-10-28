import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";

const fakeQuestions = [
    { id: 1, label: "what is your name?", type: "text" },
    { id: 2, label: "how old are you?", type: "number" },
    { id: 3, label: "what is your email?", type: "email" },
];

const fakeTitle = "cool form";

function SubmitPage() {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({});
    const [answers, setAnswers] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const formId = useParams();

    useEffect(() => {
        Promise.all([
            axios.get(`/api/question/from/${formId.id}`),
            axios.get(`/api/form/${formId.id}`),
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
        return <div>LOADING...</div>;
    }

    if (isFinished) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h1>{formData.formName}</h1>
            {questions.map((question, i) => {
                return (
                    <div key={i}>
                        <label>{question.label}</label>
                        <input
                            type={question.type}
                            onChange={(e) =>
                                handleChange(e.target.value, question.id, i)
                            }
                        />
                    </div>
                );
            })}
            <button onClick={() => handleSubmit()}>SUBMIT</button>
        </div>
    );
}

export default SubmitPage;
