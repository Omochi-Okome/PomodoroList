import { useNavigate } from "react-router-dom";

export default function All() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={() => navigate("/dashboard/home")}>Homeに行く</button>
    </div>
  );
}
