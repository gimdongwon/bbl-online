import React from 'react';
import RegisterFormContainer from '../../container/RegisterFormContainer';
import BBLListContainer from '../../container/BBLListContainer';

const IndexPage: React.FC = () => {
  return (
    <div>
      <h1>Index Page</h1>
      <RegisterFormContainer />
      <BBLListContainer />
    </div>
  );
};

export default IndexPage;
