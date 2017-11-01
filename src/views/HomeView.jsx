import React from 'react';
import Container from 'components/Container/Container.jsx';

function HomeView() {
  return (
    <Container>
      <h1>Welcome to hatch-react</h1>
      <p>hatch-react is a React starter kit. It features:</p>
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>React Router</li>
        <li>Webpack</li>
        <li>Sass</li>
      </ul>
    </Container>
  );
}

export default HomeView;
