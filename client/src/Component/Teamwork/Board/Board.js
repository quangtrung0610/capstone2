import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

import "./Board.css";

const Board = ({ color, size }) => {
  const [socket, setSocket] = useState();
  const [imageData, setImageData] = useState(null);
  let timeout;

  useEffect(() => {
    const s = io("http://localhost:1338");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.on("canvas-data", (data) => {
      setImageData(data);
      let image = new Image();
      let canvas = document.querySelector("#board");
      let ctx = canvas.getContext("2d");
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
      image.src = data;
    });
  }, [socket]);

  useEffect(() => {
    if (socket == null || imageData == null) {
      return;
    }
    socket.emit("canvas-data", imageData);
  }, [socket, imageData]);

  useEffect(() => {
    drawOnCanvas();
    if (imageData) {
      let image = new Image();
      let canvas = document.querySelector("#board");
      let ctx = canvas.getContext("2d");
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
      image.src = imageData;
    }
  }, [color, size]);

  const drawOnCanvas = () => {
    let canvas = document.querySelector("#board");
    let ctx = canvas.getContext("2d");

    let sketch = document.querySelector("#sketch");
    let sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    let mouse = { x: 0, y: 0 };
    let last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    canvas.addEventListener(
      "mousedown",
      (e) => {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      (e) => {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    const onPaint = () => {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (timeout !== undefined) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        let base64ImageData = canvas.toDataURL("image/png");
        setImageData(base64ImageData);
        //socket.emit("canvas-data", base64ImageData);
      }, 1000);
    };
  };

  return (
    <>
      <div className="sketch" id="sketch">
        <canvas className="board" id="board"></canvas>
      </div>
    </>
  );
};

export default Board;
