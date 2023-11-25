import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject {
  constructor(info, gamemap) {
    super();
    this.id = info.id;
    this.color = info.color;
    this.gamemap = gamemap;

    this.cells = [new Cell(info.r, info.c)]; // cells[0] 存放蛇的头
    this.speed = 1; // 蛇每秒钟走的格子数
  }

  start() {

  }

  update_move() { // 进行移动的函数
    this.cells[0].x += this.speed * this.timedelta / 1000;
  }

  update() {
    this.render();
    this.update_move();
  }

  render() {
    const ctx = this.gamemap.ctx;
    const L = this.gamemap.L;

    ctx.fillStyle = this.color;
    for (const cell of this.cells) {
      ctx.beginPath();
      ctx.arc(cell.x * L, cell.y * L, L / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}