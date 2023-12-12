import React, { useState } from "react";
import "./MatchingApp.css";
type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  state: ButtonState;
};

export default function MatchingApp({
  data,
}: {
  data: Record<string, string>;
}) {
  const countries = Object.keys(data);
  const capitals = Object.values(data);
  const [options, setOptions] = useState<Option[]>(
    [...countries, ...capitals]
      .sort(() => Math.random() - 0.5)
      .map((value) => ({
        value,
        state: "DEFAULT",
      }))
  );

  const [selected, setSelected] = useState<Option>();
  const GameOver = options.length === 0;

  if (GameOver) {
    return (
      <div className="end">
        <p>Game Over</p>
        <p>Congratulations!</p>
      </div>
    );
  }

  return (
    <>
      {options.map((option) => (
        <button
          className={
            option.state === "SELECTED"
              ? "selected"
              : option.state === "WRONG"
              ? "wrong"
              : ""
          }
          key={option.value}
          onClick={() => {
            if (!selected) {
              setSelected(option);
              setOptions((prevOptions) =>
                prevOptions.map((opt) =>
                  opt === option
                    ? {
                        ...opt,
                        state: "SELECTED",
                      }
                    : { ...opt, state: "DEFAULT" }
                )
              );
            } else {
              if (
                selected.value === data[option.value] ||
                data[selected.value] === option.value
              ) {
                setOptions((prevOptions) =>
                  prevOptions.filter(
                    (opt) =>
                      opt.value !== selected.value && opt.value !== option.value
                  )
                );
              } else {
                setOptions((prevOptions) =>
                  prevOptions.map((opt) =>
                    opt.value === selected.value || opt.value === option.value
                      ? { ...opt, state: "WRONG" }
                      : opt
                  )
                );
              }
              setSelected(undefined);
            }
          }}
        >
          {option.value}
        </button>
      ))}
    </>
  );
}
