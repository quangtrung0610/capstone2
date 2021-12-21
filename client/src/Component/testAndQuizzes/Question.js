import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const Question = (props) => {
  const { question, checkOption } = props;
  return (
    <Card>
      <Card.Body>
        <div className="card-title-background">
          <Card.Title>
            <div>Question {question._id}:</div>
            {question.name}
          </Card.Title>
        </div>
        <ListGroup>
          {question.options.map((option) => {
            console.log(option._id, question.selectedOption);
            return (
              <ListGroup.Item
                disabled={question.selectedOption ? true : null}
                onClick={() => checkOption(question._id, option._id)}
                style={
                  question.selectedOption == question.trueOption &&
                  option._id === question.selectedOption
                    ? { border: "2px solid #38bb38", borderRadius: ".3rem" }
                    : question.selectedOption !== question.trueOption &&
                      option._id === question.selectedOption
                    ? { border: "2px solid #e24646", borderRadius: ".3rem" }
                    : null
                }
              >
                <div className="number">{option._id}</div>
                <div>{option.name}</div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
export default Question;
