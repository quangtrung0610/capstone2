import React from "react";
import { Modal, Button } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";

function Question(props) {
  let { correct, incorrect, numberOfQuestion, testAgain } = props;
  let correctPercentage = (correct / numberOfQuestion) * 100;
  let incorrectPercentage = 100 - correctPercentage;

  return (
    <Modal show={true} onHide={testAgain} animation={false}>
      <Modal.Header>
        <Modal.Title>Your : {correctPercentage}%</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PieChart
          data={[
            {
              title: "Correct",
              value: correctPercentage,
              color: "#38bb38",
            },
            {
              title: "Incorrect",
              value: incorrectPercentage,
              color: "#e24646",
            },
          ]}
        />
        <div className="numbers-container">
          <div className="numbers">
            <div className="number correct">{correct}</div>
            <div className="number incorrect">{incorrect}</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={testAgain}>
          Test again
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Question;
