const checkEnemyArround = (activeCell, step, enemy, data) => {
    const enemysArr = [];
    let rightTop = 0;
    let rightBottom = 0;
    let leftTop = 0;
    let leftBottom = 0;

    if (activeCell.length > 0) {
        rightTop =activeCell[1] - 1 >= 0 && activeCell[0] + step <= 7 ? data[activeCell[1] - step][activeCell[0] + step] : 0;
        leftTop = activeCell[1] - 1 >= 0 && activeCell[0] - step >= 0 ? data[activeCell[1] - step][activeCell[0] - step] : 0;
        rightBottom = activeCell[1] + 1 <= 7 && activeCell[0] + step <= 7 ? data[activeCell[1] + step][activeCell[0] + step] : 0;
        leftBottom = activeCell[1] + 1 <= 7 && activeCell[0] - step >= 0 ? data[activeCell[1] + step][activeCell[0] - step] : 0;
    }

    if (enemy !== null && enemy.some((el) => el === rightTop)) {
        enemysArr.push({ coordinate: [activeCell[0] + step, activeCell[1] - step], direction: 'rightTop'});
    }else if (enemy !== null && enemy.some((el) => el === rightBottom)) {
        enemysArr.push({coordinate: [activeCell[0] + step, activeCell[1] + step], direction: 'rightBottom'});
    }else if (enemy !== null && enemy.some((el) => el === leftTop)) {
        enemysArr.push({coordinate: [activeCell[0] - step, activeCell[1] - step], direction: 'leftTop'});
    }else if (enemy !== null && enemy.some((el) => el === leftBottom)) {
        enemysArr.push({coordinate: [activeCell[0] - step, activeCell[1] + step], direction: 'leftBottom'});
    }

    return enemysArr
};

const canMoveCoordinates = (direction, enemy, data) => {
    try {
        const directionsFunc = {
            rightTop: (enemy, data) => {
                let coordinate = [];
                if (data[enemy[1] - 1][enemy[0] + 1] === 0) {
                    coordinate = {
                        moveCoordinate: [enemy[0] + 1, enemy[1] - 1],
                        enemy: enemy,
                    };
                }
                return coordinate;
            },
            rightBottom: (enemy, data) => {
                let coordinate = [];

                if (data[enemy[1] + 1][enemy[0] + 1] === 0) {
                    coordinate = {
                        moveCoordinate: [enemy[0] + 1, enemy[1] + 1],
                        enemy: enemy,
                    };
                }
                return coordinate;
            },
            leftTop: (enemy, data) => {
                let coordinate = [];

                if (data[enemy[1] - 1][enemy[0] - 1] === 0) {
                    coordinate = {
                        moveCoordinate: [enemy[0] - 1, enemy[1] - 1],
                        enemy: enemy,
                    };
                }
                return coordinate;
            },
            leftBottom: (enemy, data) => {
                let coordinate = [];

                if (data[enemy[1] + 1][enemy[0] - 1] === 0) {
                    coordinate = {
                        moveCoordinate: [enemy[0] - 1, enemy[1] + 1],
                        enemy: enemy,
                    };
                }
                return coordinate;
            },
        }
        return directionsFunc[direction](enemy, data);
    }
    catch {}
}

const possibilityChopMove = (data, activeCell) => {
    let possibilityMoves = [];
    const color = data[activeCell[1] || 0][activeCell[0] || 0];
    const enemy = color === 1 ? [2, 4] : color === 2 ? [1, 3] : null;
    let enemys = [];

    enemys = checkEnemyArround(activeCell, 1, enemy, data);

    possibilityMoves = enemys.map((el) => canMoveCoordinates(el.direction, el.coordinate, data));
    return possibilityMoves.filter((el) => !Array.isArray(el) && el !== undefined);
};

export { possibilityChopMove };
