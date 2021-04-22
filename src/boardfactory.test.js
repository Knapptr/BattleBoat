import { createBoard } from "./boardfactory";

test("create a board", () => {
    let board10 = createBoard(10);
    // print the board to check
    // console.log(JSON.stringify(board10, null, 2));
    //make sure there are ten rows in a 10 board
    expect(board10.length).toBe(10);
    // make sure there are 10 entries in each row
    expect(board10[0].length).toBe(10);
    // make sure each entry is the default empty
    expect(
        board10.every((row) =>
            row.every((cell) => cell.ship === false && cell.attacked === false)
        )
    ).toBe(true);
});
