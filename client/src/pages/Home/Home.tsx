import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFilterStore } from '../../store';

const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  return res.json();
};

const Home: React.FC = () => {
  const { searchTerm, setSearchTerm } = useFilterStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  const filteredTodos = data.filter((todo: any) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search todos...'
      />
      <ul>
        {filteredTodos.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
