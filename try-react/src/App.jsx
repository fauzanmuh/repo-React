
import { useState } from 'react'
import Header from './components/Header'

function App() {
  const students = ['Fauzan', 'Muhammad', 'Rizky'];
        const [likes, setLikes] = useState(0);

        function handleClick() {
          setLikes(likes + 1);
        }
        
        return (
            <>
            <Header />
            <Header name="Muhammad" />
            <ul>
                {students.map((student) => (
                <li key={student}>{student}</li>
                ))}
            </ul>
            <button onClick={handleClick}>Like ({likes})
              </button>
            </>
        );
}

export default App
