import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const fakeData = [
  {
    id: 1,
    formName: 'Car campaign',
    Submissions: 15,
  },
  {
    id: 2,
    formName: 'Job Application',
    Submissions: 20,
  },
  {
    id: 3,
    formName: 'School Exam',
    Submissions: 12,
  },
];

function ListPage() {
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    setFormList(fakeData);
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
                <td>{form.Submissions}</td>
                <td>
                  <Link to={`/${form.id}`}>view submit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;
