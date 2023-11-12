import { Button, InputNumber, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import "./styles.css";
import ringer from "../../assets/sounds/success-fanfare-trumpets-6185.mp3";

const CountdownTimer: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const audio = new Audio(ringer);
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        if (seconds > 0) {
          if (seconds == 1 && minutes == 0 && hours == 0) {
            setIsRunning(false);
            audio.loop = false;
            audio.play();
          }
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((hours) => hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, seconds, minutes, hours]);

  const handleClick = () => {
    if (seconds == 0 && minutes == 0 && hours == 0) {
      return;
    }
    setIsRunning((isRunning) => !isRunning);
  };
  const onChangeHour = (value: any) => {
    setHours(value);
  };
  const onChangeMinute = (value: any) => {
    setMinutes(value);
  };
  const onChangeSecond = (value: any) => {
    setSeconds(value);
  };
  return (
    <>
      <Row gutter={26}>
        <Col flex={2} className="colStart">
          <Button className="buttonStart" onClick={handleClick}>
            {!isRunning ? "Start" : "Pause"}
          </Button>
        </Col>
        <Col flex={3}>
          <Row>
            <Col flex={3}>
              <InputNumber
                disabled={isRunning}
                min={0}
                max={24}
                value={hours}
                onChange={onChangeHour}
              ></InputNumber>
            </Col>
            <p className="colon">:</p>
            <Col flex={3}>
              <InputNumber
                disabled={isRunning}
                min={0}
                max={59}
                value={minutes}
                onChange={onChangeMinute}
              ></InputNumber>
            </Col>
            <p className="colon">:</p>
            <Col flex={3}>
              <InputNumber
                disabled={isRunning}
                min={0}
                max={59}
                value={seconds}
                onChange={onChangeSecond}
              ></InputNumber>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CountdownTimer;
