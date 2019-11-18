import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const dupOps = /[+/*](?!(-?(\d|$)))|(-(?!\d|$))/g;
const leadZeros = /(^|[+/*-])0+(?!$|[.+/*-])/g;
const endOps = /[/*+-]{1,2}$/gm;
const illegalCharacters = /[^\d=/*+-.]/g;

const sanitize = input => {
  input = input.replace(dupOps, "");
  input = input.replace(leadZeros, "$1");
  input = input.replace(illegalCharacters, "");
  return input;
};

const buttons = [
  { key: "C", id: "clear" },
  { key: "1", id: "one" },
  { key: "2", id: "two" },
  { key: "3", id: "three" },
  { key: "/", id: "divide" },
  { key: "4", id: "four" },
  { key: "5", id: "five" },
  { key: "6", id: "six" },
  { key: "*", id: "multiply" },
  { key: "7", id: "seven" },
  { key: "8", id: "eight" },
  { key: "9", id: "nine" },
  { key: "-", id: "subtract" },
  { key: "0", id: "zero" },
  { key: ".", id: "decimal" },
  { key: "=", id: "equals" },
  { key: "+", id: "add" }
];

function App() {
  const [display, setDisplay] = useState("0");
  const [decimalFlag, setDecimalFlag] = useState(false);

  useEffect(() => console.log(decimalFlag), [decimalFlag]);

  const updateDisplay = input => {
    switch (input) {
      case "=":
        if (display === "0" || typeof display == "number") return;
        // eslint-disable-next-line
        setDisplay(eval(display.replace(endOps, "")));
        display % 1 > 0 ? setDecimalFlag(true) : setDecimalFlag(false);
        break;
      case "C":
        setDisplay("0");
        setDecimalFlag(false);
        break;
      case ".":
        if (!decimalFlag) setDisplay(sanitize(display + input));
        setDecimalFlag(true);
        break;
      case "+":
      case "-":
      case "/":
      case "*":
        setDecimalFlag(false);
      // eslint-disable-next-line
      default:
        setDisplay(sanitize(display + input));
    }
  };

  const initButtons = () => {
    let bs = [];

    for (let i = 1; i < buttons.length; i += 4) {
      bs.push(
        <Row key={buttons[i].key + buttons[i].id}>
          <Button
            id={buttons[i + 0].id}
            variant="light"
            key={buttons[i + 0].id}
            size="sm"
            className={buttons[i + 0].key + " col-3"}
            onClick={event => {
              event.target.blur();
              updateDisplay(event.target.className[0]);
            }}
          >
            {buttons[i + 0].key}
          </Button>
          <Button
            id={buttons[i + 1].id}
            variant="light"
            key={buttons[i + 1].id}
            size="sm"
            className={buttons[i + 1].key + " col-3"}
            onClick={event => {
              event.target.blur();
              updateDisplay(event.target.className[0]);
            }}
          >
            {buttons[i + 1].key}
          </Button>
          <Button
            id={buttons[i + 2].id}
            variant={buttons[i + 2].key === "=" ? "danger" : "light"}
            key={buttons[i + 2].id}
            size="sm"
            className={buttons[i + 2].key + " col-3"}
            onClick={event => {
              event.target.blur();
              updateDisplay(event.target.className[0]);
            }}
          >
            {buttons[i + 2].key}
          </Button>
          <Button
            id={buttons[i + 3].id}
            variant="info"
            key={buttons[i + 3].id}
            size="sm"
            className={buttons[i + 3].key + " col-3"}
            onClick={event => {
              event.target.blur();
              updateDisplay(event.target.className[0]);
            }}
          >
            {buttons[i + 3].key}
          </Button>
        </Row>
      );
    }

    return bs;
  };

  return (
    <Container className="js-calculator">
      <Row>
        <span id="display" className="col-10">
          {display}
        </span>
        <Button
          id={buttons[0].id}
          variant="outline-danger"
          key={buttons[0].id}
          className={buttons[0].key + " col-2"}
          onClick={event => {
            event.target.blur();
            updateDisplay(event.target.className[0]);
          }}
        >
          {buttons[0].key}
        </Button>
      </Row>
      {initButtons()}
    </Container>
  );
}

export default App;
