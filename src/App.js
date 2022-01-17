import "./App.css";
import { renderRoutes } from "react-router-config"; //renderRoutes 读取路由配置转化为 Route 标签
import routes from "./routes/index.js";
import { HashRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashRouter>{renderRoutes(routes)}</HashRouter>
      </header>
    </div>
  );
}

export default App;
