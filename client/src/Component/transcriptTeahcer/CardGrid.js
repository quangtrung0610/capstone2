import { Card } from "antd";
import { Link } from "react-router-dom";

const CardGrid = (grid) => {
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  return <Card.Grid style={gridStyle}>Class: {grid}</Card.Grid>;
};

export default CardGrid;
