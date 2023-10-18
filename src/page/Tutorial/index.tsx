import React, { useState } from "react";
import Flower from "../../components/Sprite/Flower";
import {
  HOW,
  background,
  label,
  leftArrow,
  rightArrow,
  cat,
  ground,
  branch,
  left,
  right,
  straight,
  force,
} from "../../assets/tutorial";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const [translateY, setTranslateY] = useState(0);

  const handleTranslateUp = () => {
    setTranslateY(translateY + 100);
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center select-none">
        <div
          style={{ backgroundImage: `url(${background})` }}
          className="w-full h-[100vh] flex justify-center items-center gap-[5rem] overflow-hidden animate-moving-background absolute"
        ></div>
        <div className="absolute top-2 right-12 text-[#ffffff] text-4xl">
          1/2
        </div>
        <div className="absolute top-0 w-[80vh]" draggable={false}>
          <img src={label} alt="label" className="w-full" draggable={false} />
        </div>
        <div className="absolute flex flex-col w-[80vh] text-white font-pixelus text-[4.5vh] leading-[4vh]">
          <div className="pt-[11vh] pl-[2vh] select-none">
            #1 กำำหนดเส้นทางที่ต้องการโดยแต่ละเส้นทางมีคุณสมบัติดังนี้
          </div>
          <div className="pt-[4vh] flex pl-[5vh]">
            <div className="pr-[2vh]">
              <img src={branch} alt="branch" className="w-[8vh]" />
            </div>
            <div className="flex items-center select-none">
              ::: ทางสามแยก เลือกไปได้ 3 เส้นทาง
            </div>
          </div>
          <div className="pt-[0.75vh] flex pl-[5vh]">
            <div className="pr-[2vh]">
              <img src={left} alt="left" className="w-[8vh]" />
            </div>
            <div className="flex items-center select-none">
              ::: เลี้ยวซ้ายหักศอก
            </div>
          </div>
          <div className="pt-[0.5vh] flex pl-[5vh]">
            <div className="pr-[2vh]">
              <img src={right} alt="right" className="w-[8vh]" />
            </div>
            <div className="flex items-center select-none">
              ::: เลี้ยวขวาหักศอก
            </div>
          </div>
          <div className="pt-[0.5vh] flex pl-[5vh]">
            <div className="pr-[2vh]">
              <img src={straight} alt="straight" className="w-[8vh]" />
            </div>
            <div className="flex items-center select-none">::: ทางตรง</div>
          </div>
          <div className="flex pl-[5vh]">
            <div className="pr-[2vh]">
              <img src={force} alt="force" className="w-[8vh]" />
            </div>
            <div className="flex items-center select-none">
              ::: ทางตรงที่บังคับไปแล้วห้ามกลับ
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <img src={ground} alt="ground" className="w-full" draggable={false} />
        </div>
        <div>
          <div className="absolute top-2 left-2">
            <img src={HOW} alt="how" className="w-[73vh]" draggable={false} />
          </div>
          <div className="absolute top-[6vh] left-[30vh] animate-bounce w-[15vh]">
            <img src={cat} alt="cat" draggable={false} />
          </div>
        </div>
        <div className="absolute flex justify-between w-full px-5 py-5 bottom-0">
          <div>
            <img
              src={leftArrow}
              className="pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px] w-[10vh]"
              draggable={false}
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div>
            <img
              src={rightArrow}
              className="pointer-events-auto hover:translate-y-[-3px] duration-100 active:opacity-70 active:hover:translate-y-[3px] w-[10vh]"
              draggable={false}
              onClick={() => {
                navigate("/tutorial2");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
