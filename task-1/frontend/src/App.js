import {useState} from "react";

function App() {
  const URL = `http://localhost:3000`;
  const [data,setData] = useState(null);
  const [error,setError] = useState(null);
  const getAll = async () => {
    try {
      const response = await fetch(URL);

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      setData(result);
      return result;
    } catch (e) {
      setError(e)
    }
  }


  return (
    <div>
      <button onClick={getAll}>Получить всех пользователей</button>
      {data && (
          <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
