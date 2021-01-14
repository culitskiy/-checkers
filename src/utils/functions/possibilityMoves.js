const possibilityMoves = (activeCell, activeColor, data) => {
    const x = activeCell[0];
    const y = activeCell[1];
    const possibilityMoves = [];

    if (activeColor === 1 || activeColor === 3) {
        const rightTop = y >= 0 && x + 1 <= 7 ? data[y - 1][x + 1] : null;
        const leftTop = y - 1 >= 0 && x - 1 >= 0 ? data[y - 1][x - 1] : null;
        
        if (rightTop === 0) {
            possibilityMoves.push([x + 1, y - 1]);
        }
        if (leftTop === 0) {
            possibilityMoves.push([x - 1, y - 1]);
        }
    } else if (activeColor === 2 || activeColor === 4) {
        const rightBottom = y + 1 <= 7 && x + 1 <= 7 ? data[y + 1][x + 1] : null;
        const leftBottom = y + 1 <= 7 && x - 1 >= 0 ? data[y + 1][x - 1] : null;

        if (rightBottom === 0) {
            possibilityMoves.push([x + 1, y + 1]);
        }
        if (leftBottom === 0) {
            possibilityMoves.push([x - 1, y + 1]);
        }
    }

    return possibilityMoves;
};

export default possibilityMoves;