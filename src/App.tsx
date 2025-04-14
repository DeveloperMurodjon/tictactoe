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
    if (spaces[id] !== "*") return;
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
    });
    let win = 0;
    combinates.map((c) => {
      let truths = 0;
      c.map((cc) => {
        if (n[cc - 1] == turn) {
          truths++;
        }
      });
      if (truths == 3) {
        win++;
      }
    });

    setSpace(n);
    if (win) {
      alert(`${turn} - winer`);
      reset();
    }
  };

  const reset = () => {
    setSpace(["*", "*", "*", "*", "*", "*", "*", "*", "*"]);
  };

  return (
    <div className="container mx-auto flex justify-center items-center">
      <div className="w-[600px] grid grid-cols-3 mt-6">
        {spaces.map((space, index) => (
          <div
            onClick={() => fill(index)}
            key={index}
            className="aspect-square border flex items-center justify-center text-5xl"
          >
            {space === "*" ? " " : space}
          </div>
        ))}
      </div>

      <button
        onClick={reset}
        className="p-3 rounded-md font-medium text-white cursor-pointer bg-red-400 ml-4"
      >
        Reset
      </button>
    </div>
  );
};

export default App;
