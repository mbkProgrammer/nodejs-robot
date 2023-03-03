class RobotMove {
  constructor() {
    this.X = 0;
    this.Y = 0;
    this.F = '';
    this.directionArray = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    this.directionIndex = 0;
  }

  setPlace(command) {
    const stringPlace = command.replace('PLACE', '');
    const placeArray = stringPlace.split(',');
    const tempX = placeArray[0];
    this.X = +tempX;
    const tempY = placeArray[1];
    this.Y = +tempY;
    const tempF = placeArray[2];
    this.F = tempF;
    this.directionIndex = this.directionArray.findIndex((item) => item === tempF.replace(' ', ''));
  }

  turnRobot(turn) {
    if (this.directionIndex > 3) {
      this.directionIndex = 0;
    } else if (this.directionIndex < 0) {
      this.directionIndex = 3;
    } else if (turn === 'right') {
      this.directionIndex += 1;
    } else {
      this.directionIndex -= 1;
    }
    this.F = this.directionArray[this.directionIndex];
    console.log(`I turned to the ${this.F}`);
  }

  moveRobot() {
    switch (this.F) {
      case 'NORTH':
        if (this.Y < 5) {
          this.Y += 1;
        }
        break;
      case 'EAST':
        if (this.X < 5) {
          this.X += 1;
        }
        break;
      case 'SOUTH':
        if (this.Y < 5) {
          this.Y -= 1;
        }
        break;
      case 'WEST':
        if (this.X < 5) {
          this.X -= 1;
        }
        break;
      default:
        break;
    }
  }

  async readCommands(data) {
    await data.map((command) => {
      switch (command) {
        case 'MOVE':
          this.moveRobot();
          break;
        case 'RIGHT':
          this.turnRobot('right');
          break;
        case 'LEFT':
          this.turnRobot('left');
          break;
        case 'REPORT':
          console.log(`${this.F} (${this.X}, ${this.Y})`);
          break;
        default:
          if (command.includes('PLACE')) {
            this.setPlace(command);
          }
          break;
      }
    });
    return { x: this.X, y: this.Y, f: this.F };
  }
}

module.exports = RobotMove;
