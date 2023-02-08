import React, { useState } from 'react';
import './App.css';
import Filter from './Filter';

const students = [
  { lastName: 'Usmanov', firstName: 'Timur', group: 'AVb-19-2', age: 22, avgScore: 3.5 },
  { lastName: 'Kozilov', firstName: 'Artem', group: 'MTib-21-1', age: 19, avgScore: 4.3 },
  { lastName: 'Kucherenko', firstName: 'Pavel', group: 'AVb-19-2', age: 21, avgScore: 3.8 },
];

const StudentTable = () => {
  const [sortConfig, setSortConfig] = useState({ sortBy: '', sortOrder: '' });
  const [studentsData, setStudentsData] = useState(students);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [groupFilter, setGroupFilter] = useState('');
  const [scoreFilter, setScoreFilter] = useState('');

  const handleHeaderClick = (column) => () => {
    const sortOrder = sortConfig.sortBy === column ? (sortConfig.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';

    let sortBy = column;
    let sortedStudents = [...studentsData];

    if (column === 'lastName' || column === 'firstName' || column === 'group') {
      sortedStudents.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        if (a[sortBy] < b[sortBy]) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        return 0;
      });
    } else {
      sortedStudents.sort((a, b) => (sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]));
    }

    setSortConfig({ sortBy, sortOrder });
    setStudentsData(sortedStudents);
  };

  const handleCellChange = (e, index, column) => {
    const newStudentsData = [...studentsData];
    newStudentsData[index][column] = e.target.value;
    setStudentsData(newStudentsData);
  };

  const handleRemoveClick = (index) => {
    const newStudentsData = [...studentsData];
    newStudentsData.splice(index, 1);

    setStudentsData(newStudentsData);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleAddClick = () => {
    setStudentsData([...studentsData, { lastName: '', firstName: '', group: '', age: '', avgScore: '' }]);
    setEditIndex(studentsData.length);
  };

  const handleSaveClick = () => setEditIndex(null);

  const handleCancelClick = () => {
    setEditIndex(null);
    setStudentsData(students);
  };

  let studentsView = studentsData.filter((student) => student.group === groupFilter || !groupFilter);

  if (scoreFilter) {
    const [min, max] = scoreFilter.split('to').map(parseFloat);

    studentsView = studentsView.filter(({ avgScore }) => avgScore >= min && avgScore <= max);
  }

  return (
    <div className='student-table'>
      <Filter
        students={studentsData}
        setGroupFilter={setGroupFilter}
        groupFilter={groupFilter}
        scoreFilter={scoreFilter}
        setScoreFilter={setScoreFilter}
      />

      <table className='student-table__table'>
        <thead>
          <tr>
            <th onClick={handleHeaderClick('lastName')}>Last Name</th>
            <th onClick={handleHeaderClick('firstName')}>First Name</th>
            <th onClick={handleHeaderClick('group')}>Group</th>
            <th onClick={handleHeaderClick('age')}>Age</th>
            <th onClick={handleHeaderClick('avgScore')}>Avg Score</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>
          {studentsView.map((student, index) => (
            <tr
              key={index}
              className={hoveredIndex === index ? 'hovered' : ''}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <td>
                {editIndex === index ? (
                  <input type='text' value={student.lastName} onChange={(e) => handleCellChange(e, index, 'lastName')} />
                ) : (
                  student.lastName
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input type='text' value={student.firstName} onChange={(e) => handleCellChange(e, index, 'firstName')} />
                ) : (
                  student.firstName
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input type='text' value={student.group} onChange={(e) => handleCellChange(e, index, 'group')} />
                ) : (
                  student.group
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input type='text' value={student.age} onChange={(e) => handleCellChange(e, index, 'age')} />
                ) : (
                  student.age
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input type='text' value={student.avgScore} onChange={(e) => handleCellChange(e, index, 'avgScore')} />
                ) : (
                  student.avgScore
                )}
              </td>
              {editIndex === index ? (
                <td>
                  <button className='button' onClick={() => handleSaveClick(index)}>Save</button>
                  <button className='button' onClick={() => handleCancelClick(index)}>Cancel</button>
                </td>
              ) : (
                <td>
                  <button className='button' onClick={() => handleEditClick(index)}>Edit</button>
                  <button className='button' onClick={() => handleRemoveClick(index)}>Remove</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className='add' onClick={handleAddClick}>Add new student</button>
    </div>
  );
};

export default StudentTable;
