const fs = require('fs');
const RobotMove = require('./src/model/robotMove');

const processMove = (input) => {
  const robotMoveObj = new RobotMove();

  return robotMoveObj.readCommands(input);
};

const runApp = async () => {
  // 1. Read txt files
  const inputTxt = fs.readFileSync('./input/input.txt', 'utf-8').split('\n');

  // 2. Process robot movement
  const result = await processMove(inputTxt);

  // 3. Show result in console
  console.log(`${result.f} (${result.x}, ${result.y})`);
};

runApp();
