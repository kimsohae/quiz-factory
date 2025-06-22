import React, { useRef, useEffect } from "react";

type RoundedSquareWithEyesCanvasProps = {
  size?: number; // 정사각형 한 변의 크기 (px)
  color?: string; // 사각형 배경색
  borderRadius?: number; // 모서리 둥글기
};

const RoundedSquareWithEyesCanvas: React.FC<
  RoundedSquareWithEyesCanvasProps
> = ({ size = 80, color = "#21CA86", borderRadius = 16 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const x = 0;
    const y = 0;
    const w = size;
    const h = size;
    const r = Math.min(borderRadius, size / 2);

    // ⬛️ 둥근 정사각형 그리기
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // 👁 동그란 눈 그리기
    const eyeRadiusX = size * 0.12; // 가로
    const eyeRadiusY = size * 0.12; // 세로
    const pupilRadiusX = size * 0.1;
    const pupilRadiusY = size * 0.1;

    const leftEye = { x: size * 0.3, y: size * 0.35 };
    const rightEye = { x: size * 0.7, y: size * 0.35 };

    const drawEye = (center: { x: number; y: number }) => {
      // 흰자 - 타원
      ctx.beginPath();
      ctx.ellipse(
        center.x,
        center.y,
        eyeRadiusX,
        eyeRadiusY,
        0,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "white";
      ctx.fill();

      // 검은자 - 원
      ctx.beginPath();
      ctx.ellipse(
        center.x > 50 ? center.x - 2 : center.x + 2,
        center.y,
        pupilRadiusX,
        pupilRadiusY,
        0,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "black";
      ctx.fill();

      // 안광
      ctx.beginPath();
      ctx.arc(
        center.x > 50 ? center.x - 2 + 4 : center.x + 2 + 4,
        center.y - 4,
        pupilRadiusX * 0.3,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "white";
      ctx.fill();
    };

    drawEye(leftEye);
    drawEye(rightEye);

    /* ---------- 웃는 입 + 벌림 ---------- */
    const mouthBottomY = h * 0.58;

    // 혀
    ctx.beginPath();
    ctx.arc(w / 2, mouthBottomY - 7, w * 0.11, 0, Math.PI, false);
    ctx.fillStyle = "#fa374e";
    ctx.fill();
  }, [size, color, borderRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="animate-[float_3s_infinite_ease-in-out]"
      width={size}
      height={size}
      style={{ display: "block" }}
    />
  );
};

export default RoundedSquareWithEyesCanvas;
