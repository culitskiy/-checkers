const rightBottomCheck = (x, y, data, enemyColor, activeColor) => {
    const result = {
        enemy: [],
        possibilityMoves: [],
    };
    let isFindMove = false;

    for (let i = 1; x + i - 1 >= 0 && x + i + 1 <= 7 && y + i - 1 >= 0 && y + i + 1 <= 7; i += 1) {
        const checkingCell = data[i + y][i + x];
        const isCheckingCellFriend = activeColor.some((el) => el === checkingCell);
        const isCheckingCellEnemy = enemyColor.some((el) => el === checkingCell);
        const isValidCoordinates = (x + i + 1 <= 7) && (y + i + 1 <= 7);
        const isAfterEmpty = data[i + y + 1][i + x + 1] === 0;
        const isBeforeEmtyOrFriend = data[i + y - 1][i + x - 1] === 0 || activeColor.some((el) => data[i + y - 1][i + x - 1] === el);

        if (isCheckingCellFriend) {
            break;
        }

        if (isCheckingCellEnemy && result.enemy.length === 0) {
            if (isValidCoordinates && isAfterEmpty && isBeforeEmtyOrFriend) {
                isFindMove = true;
                result.enemy = [x + i, y + i];
                // result.possibilityMoves.push([i + x + 1, i + y + 1])
                continue;
                // break;
            }
        }

        if (isFindMove && checkingCell === 0) {
            result.possibilityMoves.push([i + x, i + y]);
        } else {
            isFindMove = false;
        }
    }

    return result;
};

const leftTopCheck = (x, y, data, enemyColor, activeColor) => {
    const result = {
        enemy: [],
        possibilityMoves: [],
    };
    let isFindMove = false;

    for (let i = 1; x - i - 1 >= 0 && x - i + 1 <= 7 && y - i - 1 >= 0 && y - i + 1 <= 7; i += 1) {
        const checkingCell = data[y - i][x - i];
        const isCheckingCellFriend = activeColor.some((el) => el === checkingCell);
        const isCheckingCellEnemy = enemyColor.some((el) => el === checkingCell);
        // const isValidCoordinates = Math.min(x, y) - i - 1 >= 0;
        const isValidCoordinates = x - i - 1 >= 0 && x - i + 1 <= 7 && y - i - 1 >= 0 && y - i + 1 <= 7;
        const isAfterEmpty = data[y - i - 1][x - i - 1] === 0;
        const isBeforeEmtyOrFriend = data[y - i + 1][x - i + 1] === 0 || activeColor.some((el) => data[y - i + 1][x - i + 1] === el);

        if (isCheckingCellFriend) {
            break;
        }

        if (isCheckingCellEnemy && result.enemy.length === 0) {
            if (isValidCoordinates && isAfterEmpty && isBeforeEmtyOrFriend) {
                isFindMove = true;
                result.enemy = [x - i, y - i];
                // result.possibilityMoves.push([x - i - 1, y - i - 1])
                continue;
                // break;
            }
        }

        if (isFindMove && checkingCell === 0) {
            result.possibilityMoves.push([x - i, y - i]);
        } else {
            isFindMove = false;
        }
    }

    return result;
};

const leftBottomCheck = (x, y, data, enemyColor, activeColor) => {
    const result = {
        enemy: [],
        possibilityMoves: [],
    };
    let isFindMove = false;

    for (let i = 1; (x - i - 1 >= 0) && (y + i + 1 <= 7); i += 1) {
        const checkingCell = data[y + i][x - i];
        const isCheckingCellFriend = activeColor.some((el) => el === checkingCell);
        const isCheckingCellEnemy = enemyColor.some((el) => el === checkingCell);
        const isValidCoordinates = (x - i - 1 >= 0) && (y + i + 1 <= 7);
        const isAfterEmpty = data[y + i + 1][x - i - 1] === 0;
        const isBeforeEmtyOrFriend = data[y + i - 1][x - i + 1] === 0 || activeColor.some((el) => data[y + i - 1][x - i + 1] === el);

        if (isCheckingCellFriend) {
            break;
        }

        if (isCheckingCellEnemy && result.enemy.length === 0) {
            if (isValidCoordinates && isAfterEmpty && isBeforeEmtyOrFriend) {
                isFindMove = true;
                result.enemy = [x - i, y + i];
                // result.possibilityMoves.push([x - i - 1, y + i + 1])
                continue;
                // break;
            }
        }

        if (isFindMove && checkingCell === 0) {
            result.possibilityMoves.push([x - i, y + i]);
        } else {
            isFindMove = false;
        }
    }

    return result;
};

const rightTopCheck = (x, y, data, enemyColor, activeColor) => {
    const result = {
        enemy: [],
        possibilityMoves: [],
    };
    let isFindMove = false;

    for (let i = 1; (x + i + 1 <= 7) && (y - i - 1 >= 0); i += 1) {
        const checkingCell = data[y - i][x + i];
        const isCheckingCellFriend = activeColor.some((el) => el === checkingCell);
        const isCheckingCellEnemy = enemyColor.some((el) => el === checkingCell);
        const isValidCoordinates = (x + i + 1 <= 7) && (y - i - 1 >= 0);
        const isAfterEmpty = data[y - i - 1][x + i + 1] === 0;
        const isBeforeEmtyOrFriend = data[y - i + 1][x + i - 1] === 0 || activeColor.some((el) => data[y - i + 1][x + i - 1] === el);

        if (isCheckingCellFriend) {
            break;
        }

        if (isCheckingCellEnemy && result.enemy.length === 0) {
            if (isValidCoordinates && isAfterEmpty && isBeforeEmtyOrFriend) {
                isFindMove = true;
                result.enemy = [x + i, y - i];
                result.possibilityMoves.push([x + i + 1, y - i - 1]);
                continue;
                // break;
            }
        }

        if (isFindMove && checkingCell === 0) {
            result.possibilityMoves.push([x + i, y - i]);
        } else {
            isFindMove = false;
        }
    }
    return result;
};

const damesPossibilityChopMove = (activeCell, activeColor, data) => {
    const enemyColor = activeColor === 1 ? [2, 4] : activeColor === 2 ? [1, 3] : null;
    const activeColors = activeColor === 1 ? [1, 3] : activeColor === 2 ? [2, 4] : null;
    const x = activeCell[0];
    const y = activeCell[1];
    const possibilityMoves = [];

    possibilityMoves.push(rightBottomCheck(x, y, data, enemyColor, activeColors));
    possibilityMoves.push(leftTopCheck(x, y, data, enemyColor, activeColors));
    possibilityMoves.push(leftBottomCheck(x, y, data, enemyColor, activeColors));
    possibilityMoves.push(rightTopCheck(x, y, data, enemyColor, activeColors));
    return possibilityMoves;
};

export default damesPossibilityChopMove;
