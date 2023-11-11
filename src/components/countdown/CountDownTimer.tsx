import { Button, InputNumber, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import "./styles.css";
const CountdownTimer: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        if (seconds > 0) {
          if (seconds == 1 && minutes == 0 && hours == 0) {
            setIsRunning(false);
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
      <Row>
        <Col flex={2}>
          <Button className="buttonStart" onClick={handleClick}>
            {!isRunning ? "Start" : "Pause"}
          </Button>
        </Col>
        <Col flex={3}>
          <InputNumber
            disabled={isRunning}
            min={0}
            max={24}
            value={hours}
            onChange={onChangeHour}
          ></InputNumber>
          <InputNumber
            disabled={isRunning}
            min={0}
            max={59}
            value={minutes}
            onChange={onChangeMinute}
          ></InputNumber>
          <InputNumber
            disabled={isRunning}
            min={0}
            max={59}
            value={seconds}
            onChange={onChangeSecond}
          ></InputNumber>
        </Col>
      </Row>
    </>
  );
};

export default CountdownTimer;
