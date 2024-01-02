import React from "react";
import clsx from "clsx";

import { KeyValue } from "../../types/common";

import Arrow from "../../icons/Arrow";

type Props = {
  options: KeyValue[];
  selectedOption: KeyValue;
  onClick: (select: KeyValue) => void;
};

export default function SelectBox({ options, selectedOption, onClick }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="w-[75px] p-2 rounded-[3px] border border-primary justify-center items-center gap-1 flex relative cursor-pointer"
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
    >
      <div className="justify-start items-start gap-2.5 flex">
        <div className="text-primary text-xs font-medium">
          {selectedOption.value}
        </div>
      </div>
      <div className={clsx(["transition-all", { "rotate-180": isOpen }])}>
        <Arrow />
      </div>
      <div
        className={clsx(
          "absolute top-[calc(100%+5px)] left-0 w-[100%] bg-white rounded-[3px] border border-primary border-opacity-20 shadow-lg overflow-hidden z-10",
          { hidden: !isOpen }
        )}
      >
        {options.map((option) => (
          <div
            key={option.key}
            className="p-2 hover:bg-primary hover:bg-opacity-10"
            onClick={() => {
              onClick(option);
            }}
          >
            <div className="text-primary text-xs font-medium">
              {option.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
