import { ImageUpload } from "./home";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ImageUpload />} />
      </Routes>
    </Router>
  );
}

export default App;