import { useState } from "react";

const App = () => {
  const [spaces, setSpace] = useState<string[]>([
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ]);
  const [turn, setTurn] = useState("X");

  const combinates = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 2, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const fill = (id: number) => {
    const n = spaces.map((space, index) => {
      if (index == id && turn == "X") {
        setTurn("O");

        return "X";
      } else if (index == id && space == "*" && turn == "O") {
        setTurn("X");
        return "O";
      } else {
        return space;
      }
      combinates.map((c) => {
        c;
      });
    });
    setSpace(n);
  };

  return (
    <div className="container">
      <div>
        <div className="w-[600px] mx-auto grid grid-cols-3">
          {spaces.map((space, index) => (
            <div
              onClick={() => fill(index)}
              key={index}
              className="aspect-square border flex items-center justify-center text-5xl "
            >
              {space == "*" ? " " : space}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
