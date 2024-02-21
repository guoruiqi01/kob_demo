import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMapObject extends AcGameObject {
  constructor(ctx, parent, store) {
    super();
    this.store = store;
    this.ctx = ctx;
    this.parent = parent;
    this.L = 0;
    this.rows = 13;
    this.cols = 14;
    this.inner_walls = 20;
    this.walls = [];

    this.snakes = [
      new Snake({id: 0, color: "red", r: this.rows - 2, c: 1}, this),
      new Snake({id: 1, color: "blue", r: 1, c: this.cols - 2}, this)
    ]
  }

  add_listening_events() {
    this.ctx.canvas.focus();
    const [snake0, snake1] = this.snakes;
    this.ctx.canvas.addEventListener("keydown", e => {
      if (e.key === 'w') snake0.set_direction(0);
      else if (e.key === 'd') snake0.set_direction(1);
      else if (e.key === 's') snake0.set_direction(2);
      else if (e.key === 'a') snake0.set_direction(3);
      else if (e.key === 'ArrowUp') snake1.set_direction(0);
      else if (e.key === 'ArrowRight') snake1.set_direction(1);
      else if (e.key === 'ArrowDown') snake1.set_direction(2);
      else if (e.key === 'ArrowLeft') snake1.set_direction(3);
    })
  }

  create_walls() {
    const g = this.store.state.pk.gamemap;

    for (let r = 0; r < this.rows; r ++) {
      for (let c = 0; c < this.cols; c ++) {
        if (g[r][c]) this.walls.push(new Wall(r, c, this))
      }
    }
    return true;
  }

  start() {
    this.create_walls()
    this.add_listening_events();
  }

  update_size() {
    // 这里的 L 是浮点数，而画图时用的是整像素，因此会造成画墙时有墙缝
    // 这里觉得有没有缝影响不大，所以就不改了
    this.L = Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows);
    this.ctx.canvas.width = this.L * this.cols;
    this.ctx.canvas.height = this.L * this.rows;
  }

  check_ready() {
    for (const snake of this.snakes) {
      if (snake.status !== "idle") return false;
      if (snake.direction === -1) return false;
    }
    return true;
  }

  check_valid(cell) {
    for (const wall of this.walls) {
      if (cell.r === wall.r && cell.c === wall.c) {
        return false;
      }
    }
    for (const snake of this.snakes) {
      // 判断是否会撞到对方或者自己的蛇身
      let k = snake.cells.length;
      if (!snake.check_tail_increasing()) {
        k --;
      }
      for (let i = 0; i < k; i ++) {
        if (cell.r === snake.cells[i].r && cell.c === snake.cells[i].c) {
          return false;
        }
      }
    }
    return true;
  }

  // 让两条蛇进行下一步操作，起到宏观判断
  next_step() {
    for (const snake of this.snakes) {
      snake.next_step();
    }
  }

  update() {
    this.update_size();
    if (this.check_ready()) {
      this.next_step();
    } 
    this.render();
  }

  render() {
    let c1olor_odd = "#AAD751", color_even = "#A2D149";
    for (let r = 0; r < this.rows; r ++) {
      for (let c = 0; c < this.cols; c ++) {
        if ((r + c) % 2 == 0) this.ctx.fillStyle = c1olor_odd;
        else this.ctx.fillStyle = color_even;
        this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
      }
    }
  }
}

