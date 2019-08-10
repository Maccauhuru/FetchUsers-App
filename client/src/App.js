import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const displayUsers = async () => {
    const res = await fetch(`http://localhost:4000/?count=${count}`)
    const userData = await res.json();
    setUsers(userData.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>FetchUsers App</h1>
          <input
            style={{ fontSize: '2rem' }}
            placeholder='Select number of users'
            type='number'
            onChange={event => setCount(event.target.value)}
          />
          <button style={{ fontSize: '2rem' }}
            onClick={displayUsers}>Submit</button>
          {users.map(user => (
            <div
              key={user.login.uuid}
              style={{
                width: '100%',
                display: 'flex',
                marginTop: '.5em',
                justifyContent: 'space-between',
                alignContent: 'center'
              }}
            >
              <img style={{
                borderRadius: '50%',
                height: '100%',
              }}
                src={user.picture.large}
                alt={user.name.first}
              />
              <div>
                <h3>{user.name.first}</h3>
                <p>{user.email}</p>
                <p>{user.location.state}</p>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
