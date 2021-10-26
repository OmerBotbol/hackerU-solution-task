import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const fakeQuestions = [
  { id: 1, label: 'what is your name?', type: 'text' },
  { id: 2, label: 'how old are you?', type: 'number' },
  { id: 3, label: 'what is your email?', type: 'email' },
];

const fakeTitle = 'cool form';

function SubmitPage() {
  const [questions, setQuestions] = useState([]);
  const [formName, setFormName] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    /** http request to get questions and the form name by form id */
    setTimeout(() => {
      setQuestions(fakeQuestions);
      setFormName(fakeTitle);
    }, 1000);
  }, []);

  const handleChange = (answer, questionId, i) => {
    const answerArr = [...answers];
    answerArr[i] = { questionId, answer };
    setAnswers(answerArr);
  };

  const handleSubmit = () => {
    if (answers.length === questions.length) {
      /** http request to post the answers to the server */
      console.log(answers);
      return setIsFinished(true);
    }
    console.log('missing answers');
  };

  if (questions.length === 0 || !formName) {
    return <div>LOADING...</div>;
  }

  if (isFinished) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>{formName}</h1>
      {questions.map((question, i) => {
        return (
          <div key={i}>
            <label>{question.label}</label>
            <input
              type={question.type}
              onChange={(e) => handleChange(e.target.value, question.id, i)}
            />
          </div>
        );
      })}
      <button onClick={() => handleSubmit()}>SUBMIT</button>
    </div>
  );
}

export default SubmitPage;
