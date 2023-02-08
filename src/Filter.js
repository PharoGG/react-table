import React, { useState, useEffect } from 'react';

const Filter = ({ students, setGroupFilter, groupFilter, setScoreFilter, scoreFilter }) => {
  const [uniqueGroups, setUniqueGroups] = useState([]);

  useEffect(() => {
    if (!students) return;

    const groups = students.map((student) => student.group);
    const unique = [...new Set(groups)];

    setUniqueGroups(unique);
  }, [students]);

  const handleGroupFilter = (event) => setGroupFilter(event.target.value);

  const handleScoreFilter = (event) => setScoreFilter(event.target.value);

  return (
    <div className='filter'>
      <div className='group-filter'>
        <span>Group:</span>
        <select value={groupFilter} onChange={handleGroupFilter}>
          <option value=''>All</option>
          {uniqueGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className='score-filter'>
        <span>Avg Score:</span>
        <select value={scoreFilter} onChange={handleScoreFilter}>
          <option value=''>All</option>
          <option value='2to3'>2 to 3</option>
          <option value='3to4'>3 to 4</option>
          <option value='4to5'>4 to 5</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
