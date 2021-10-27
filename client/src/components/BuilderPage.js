import React, { useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

function BuilderPage() {
  const [questions, setQuestions] = useState([]);
  const [label, setLabel] = useState('');
  const [type, setType] = useState('');
  const [formName, setFormName] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const addToQuestions = () => {
    if (label && type) {
      const currentQuestions = [...questions];
      currentQuestions.push({ label, type });
      setQuestions(currentQuestions);
      setLabel('');
      setType('');
    }
  };

  const handleSubmit = () => {
    /** http request to post the form */
    if (formName && questions.length > 0) {
      const formData = { formName, questions };
      axios.post('http://127.0.0.1:8000/api/question', formData).then(() => {
        setIsFinished(true);
      });
    }
  };

  if (isFinished) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Create New Form</h1>
      <div id="form-name-container">
        <label>Form Name: </label>
        <input
          type="text"
          placeholder="enter the form name here"
          onChange={(e) => setFormName(e.target.value)}
        />
      </div>
      <div id="question-data-container">
        <div id="label-container">
          <label>label: </label>
          <input
            type="text"
            value={label}
            placeholder="enter your label here"
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div id="type-container">
          <label>type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="" disabled>
              Select your option
            </option>
            <option value="text">text</option>
            <option value="date">date</option>
            <option value="email">email</option>
            <option value="tel">telephone</option>
            <option value="number">number</option>
          </select>
        </div>
        <button onClick={() => addToQuestions()}>ADD</button>
      </div>
      {questions.length > 0 && (
        <div>
          <table>
            <tbody>
              <tr>
                <th>Label</th>
                <th>type</th>
              </tr>
              {questions.map((question, i) => {
                return (
                  <tr key={i}>
                    <td>{question.label}</td>
                    <td>{question.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={() => handleSubmit()}>SUBMIT</button>
        </div>
      )}
    </div>
  );
}

export default BuilderPage;
