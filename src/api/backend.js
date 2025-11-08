import axios from "axios";

const backend = axios.create({
  baseURL: "http://localhost:3000", // backend URL
});

useEffect(() => {
  backend.get("/")
    .then(res => console.log(res.data))
    .catch(console.error);
}, []);

await axios.post(`${BACKEND_URL}/api/obs/aliases`, {
  streamerId: "logicallysleepy",
  input,
  actual: null,
});


export default backend;
