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
  const handleWheelSecond = (e: React.WheelEvent<HTMLInputElement>) => {
    let tmpSeconds = seconds + (e.deltaY > 0 ? -1 : 1);
    tmpSeconds = ((tmpSeconds % 60) + 60) % 60;
    setSeconds(tmpSeconds);
  };
  const handleWheelMinute = (e: React.WheelEvent<HTMLInputElement>) => {
    let tmpMinutes = minutes + (e.deltaY > 0 ? -1 : 1);
    tmpMinutes = ((tmpMinutes % 60) + 60) % 60;
    setMinutes(tmpMinutes);
  };
  const handleWheelHour = (e: React.WheelEvent<HTMLInputElement>) => {
    let tmpHours = hours + (e.deltaY > 0 ? -1 : 1);
    tmpHours = ((tmpHours % 24) + 24) % 24;
    setHours(tmpHours);
  };
  return (
    <>
      <Row gutter={16} justify="center">
        <Col flex={2} className="col-start">
          <Button className="button-start" onClick={handleClick}>
            {!isRunning ? "Start" : "Pause"}
          </Button>
        </Col>
        <Col flex={3}>
          <Row>
            <Col flex={3} className="input-col">
              <InputNumber
                disabled={isRunning}
                formatter={(value) => `${value}`.padStart(2, "0")}
                onWheel={handleWheelHour}
                min={0}
                max={24}
                value={hours}
                onChange={onChangeHour}
              ></InputNumber>
            </Col>
            <Col className="time-separator-container">
              <span className="time-separator">:</span>
            </Col>
            <Col flex={3} className="input-col">
              <InputNumber
                disabled={isRunning}
                formatter={(value) => `${value}`.padStart(2, "0")}
                onWheel={handleWheelMinute}
                min={0}
                max={59}
                value={minutes}
                onChange={onChangeMinute}
              ></InputNumber>
            </Col>
            <Col className="time-separator-container">
              <span className="time-separator">:</span>
            </Col>
            <Col flex={3} className="input-col">
              <InputNumber
                disabled={isRunning}
                formatter={(value) => `${value}`.padStart(2, "0")}
                onWheel={handleWheelSecond}
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
