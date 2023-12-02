import { Typography } from "antd";
import "./App.css";
import CountDownTimer from "./components/countdown/CountDownTimer";

const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Title
        level={1}
        style={{ color: "black", textAlign: "center", fontSize: "4em" }}
      >
        Countdown Timer App
      </Title>
      <CountDownTimer />
    </div>
  );
}

export default App;
