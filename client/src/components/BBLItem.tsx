import React from 'react';

interface BBLItemProps {
  name: string;
  amount: number;
  date: string;
}

const BBLItem: React.FC<BBLItemProps> = ({ name, amount, date }) => {
  return (
    <div>
      <h4>{name}</h4>
      <p>
        {amount} BBL - {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default BBLItem;
