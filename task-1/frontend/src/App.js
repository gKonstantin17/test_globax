import {useState} from "react";
import {getAll, searchUsers} from "./api";

function App() {
  const URL = `http://localhost:3000`;
  const [data,setData] = useState(null);

  const get = async () => {
      const result = await getAll()
      setData(result)
  }
  const search = async () => {
      const result = await searchUsers('carney')
      setData(result)
  }


  return (
    <div>
      <button onClick={get}>Получить всех пользователей</button>
      <button onClick={search}>Найти Carney</button>
      {data && (
          <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
