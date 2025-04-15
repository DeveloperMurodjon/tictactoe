import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Bot, Users } from "lucide-react";
import { Button } from "./components/ui/button";

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
  const [twoPlayer, setTwoPlayer] = useState(true);
  const [level, setLevel] = useState("Easy");

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

  const computer = (currentSpaces: string[]) => {
    if (level == "Easy") {
      const emptyIndexes = currentSpaces
        .map((val, index) => (val === "*" ? index : null))
        .filter((val) => val !== null) as number[];
      if (emptyIndexes.length === 0) return;
      const randomIndex =
        emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      const newSpaces = currentSpaces.map((space, index) =>
        index === randomIndex ? "O" : space
      );
      setSpace(newSpaces);
      let win = 0;
      combinates.forEach((c) => {
        let truths = 0;
        c.forEach((cc) => {
          if (newSpaces[cc - 1] === "O") {
            truths++;
          }
        });
        if (truths === 3) win++;
      });
      if (win) {
        setTimeout(() => {
          alert(`O - yutdi`);
          reset();
        }, 100);
      }
    } else if (level == "Hard") {
      let filled = false;
      combinates.forEach((c) => {
        const [a, b, c1] = c;
        const values = [
          currentSpaces[a - 1],
          currentSpaces[b - 1],
          currentSpaces[c1 - 1],
        ];
        const countO = values.filter((v) => v === "O").length;
        const countEmpty = values.filter((v) => v === "*").length;
        if (countO === 2 && countEmpty === 1) {
          const index = c.find((i) => currentSpaces[i - 1] === "*");
          if (index !== undefined) {
            const newSpaces = currentSpaces.map((space, i) =>
              i === index - 1 ? "O" : space
            );
            setSpace(newSpaces);
            filled = true;
            let win = 0;
            combinates.forEach((c) => {
              let truths = 0;
              c.forEach((cc) => {
                if (newSpaces[cc - 1] === "O") truths++;
              });
              if (truths === 3) win++;
            });
            if (win) {
              setTimeout(() => {
                alert("O - yutdi");
                reset();
              }, 100);
            }
          }
        }
      });
      if (!filled) {
        combinates.forEach((c) => {
          const [a, b, c1] = c;
          const values = [
            currentSpaces[a - 1],
            currentSpaces[b - 1],
            currentSpaces[c1 - 1],
          ];
          const countX = values.filter((v) => v === "X").length;
          const countEmpty = values.filter((v) => v === "*").length;
          if (countX === 2 && countEmpty === 1) {
            const index = c.find((i) => currentSpaces[i - 1] === "*");
            if (index !== undefined) {
              const newSpaces = currentSpaces.map((space, i) =>
                i === index - 1 ? "O" : space
              );
              setSpace(newSpaces);
              filled = true;
              let win = 0;
              combinates.forEach((c) => {
                let truths = 0;
                c.forEach((cc) => {
                  if (newSpaces[cc - 1] === "O") truths++;
                });
                if (truths === 3) win++;
              });
              if (win) {
                setTimeout(() => {
                  alert("O - yutdi");
                  reset();
                }, 100);
              }
            }
          }
        });
      }
      if (!filled) {
        const emptyIndexes = currentSpaces
          .map((val, index) => (val === "*" ? index : null))
          .filter((val) => val !== null) as number[];
        if (emptyIndexes.length === 0) return;
        const randomIndex =
          emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        const newSpaces = currentSpaces.map((space, index) =>
          index === randomIndex ? "O" : space
        );
        setSpace(newSpaces);
        let win = 0;
        combinates.forEach((c) => {
          let truths = 0;
          c.forEach((cc) => {
            if (newSpaces[cc - 1] === "O") truths++;
          });
          if (truths === 3) win++;
        });
        if (win) {
          setTimeout(() => {
            alert(`O - yutdi`);
            reset();
          }, 100);
        }
      }
    } else if (level == "Expert") {
      let bestMove = null;
      const checkWinningMove = (player: string): number | null => {
        for (let i = 0; i < combinates.length; i++) {
          const [a, b, c] = combinates[i];
          const values = [
            currentSpaces[a - 1],
            currentSpaces[b - 1],
            currentSpaces[c - 1],
          ];
          const countPlayer = values.filter((v) => v === player).length;
          const countEmpty = values.filter((v) => v === "*").length;
          if (countPlayer === 2 && countEmpty === 1) {
            const idx = combinates[i].find(
              (index) => currentSpaces[index - 1] === "*"
            );
            if (idx !== undefined) return idx;
          }
        }
        return null;
      };
      const winMove = checkWinningMove("O");
      const blockMove = checkWinningMove("X");
      if (winMove != null) {
        bestMove = winMove - 1;
      } else if (blockMove != null) {
        bestMove = blockMove - 1;
      } else if (currentSpaces[4] === "*") {
        bestMove = 4;
      } else {
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(
          (i) => currentSpaces[i] === "*"
        );
        if (availableCorners.length > 0) {
          bestMove =
            availableCorners[
              Math.floor(Math.random() * availableCorners.length)
            ];
        } else {
          const emptyIndexes = currentSpaces
            .map((space, i) => (space === "*" ? i : null))
            .filter((i) => i !== null) as number[];
          bestMove =
            emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        }
      }
      if (bestMove != null) {
        const newSpaces = currentSpaces.map((space, index) =>
          index === bestMove ? "O" : space
        );
        setSpace(newSpaces);
        let win = 0;
        combinates.forEach((c) => {
          let truths = 0;
          c.forEach((cc) => {
            if (newSpaces[cc - 1] === "O") truths++;
          });
          if (truths === 3) win++;
        });
        if (win) {
          setTimeout(() => {
            alert(`O - yutdi`);
            reset();
          }, 100);
        }
      }
    }
  };

  const fill = (id: number) => {
    if (twoPlayer) {
      if (spaces[id] !== "*") return;
      const newSpaces = spaces.map((space, index) => {
        if (index === id && turn === "X") {
          setTurn("O");
          return "X";
        } else if (index === id && turn === "O") {
          setTurn("X");
          return "O";
        } else {
          return space;
        }
      });
      setSpace(newSpaces);
      let win = 0;
      combinates.forEach((c) => {
        let truths = 0;
        c.forEach((cc) => {
          if (newSpaces[cc - 1] === turn) truths++;
        });
        if (truths === 3) win++;
      });
      if (win) {
        setTimeout(() => {
          alert(`${turn} - yutdi`);
          reset();
        }, 100);
      }
    } else {
      if (spaces[id] !== "*") return;
      const newSpaces = spaces.map((space, index) =>
        index === id ? "X" : space
      );
      setSpace(newSpaces);
      let win = 0;
      combinates.forEach((c) => {
        let truths = 0;
        c.forEach((cc) => {
          if (newSpaces[cc - 1] === "X") truths++;
        });
        if (truths === 3) win++;
      });
      if (win) {
        setTimeout(() => {
          alert("X - yutdi");
          reset();
        }, 100);
      } else {
        setTimeout(() => {
          computer(newSpaces);
        }, 300);
      }
    }
  };

  const reset = () => {
    setSpace(["*", "*", "*", "*", "*", "*", "*", "*", "*"]);
    setTurn("X");
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
      <div className="flex flex-col items-start ml-3 gap-2">
        <Button
          onClick={() => {
            setTwoPlayer(!twoPlayer);
            reset();
          }}
          variant={"secondary"}
          className="cursor-pointer flex text-lg w-[182px]"
        >
          {twoPlayer === true ? (
            <div className="cursor-pointer items-center gap-1 flex text-lg w-[182px]">
              <Bot />
              Play with computer
            </div>
          ) : (
            <div className="cursor-pointer items-center gap-1 flex text-lg w-[182px]">
              <Users />2 player mode
            </div>
          )}
        </Button>
        {twoPlayer ? (
          <div />
        ) : (
          <div className="mb-2">
            <Select onValueChange={(value) => setLevel(value)}>
              <SelectTrigger className="w-[182px]">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select level</SelectLabel>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        <button
          onClick={reset}
          className="px-18 py-1 rounded-md font-medium text-white cursor-pointer bg-red-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
