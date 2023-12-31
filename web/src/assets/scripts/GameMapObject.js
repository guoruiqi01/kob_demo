import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMapObject extends AcGameObject {
  constructor(ctx, parent) {
    super();
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

  check_connectivity(g, sx, sy, tx, ty) {
    if (sx == tx && sy == ty) return true;
    g[sx][sy] = true;

    let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
    for (let i = 0; i < 4; i ++) {
      let x = sx + dx[i], y = sy + dy[i];
      if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) 
        return true
    }

    return false;
  }

  create_walls() {
    // 抽象表示地图
    const g = []
    // 现在是按行进行遍历
    for (let r = 0; r < this.rows; r ++) {
      // 每一行直接“拉宽”
      g[r] = []
      // 初始化
      for (let c = 0; c < this.cols; c ++) {
        g[r][c] = false;
      }
    }

    // 给矩阵的左右两边加上墙
    for (let r = 0; r < this.rows; r ++) {
      g[r][0] = g[r][this.cols - 1] = true;
    }

    // 给矩阵的上下两边加上墙
    for (let c = 0; c < this.cols; c ++) {
      g[0][c] = g[this.rows - 1][c] = true;
    }

    // 随机添加障碍物
    for (let i = 0; i < this.inner_walls / 2; i ++) {
      for (let j = 0; j < 1000; j ++) {
        let r = parseInt(Math.random() * this.rows);
        let c = parseInt(Math.random() * this.cols);
        if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;
        if (r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2) continue
        g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
        break;
      }
    }

    const copy_g = JSON.parse(JSON.stringify(g));
    if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2))
      return false;

    for (let r = 0; r < this.rows; r ++) {
      for (let c = 0; c < this.cols; c ++) {
        if (g[r][c]) this.walls.push(new Wall(r, c, this))
      }
    }
    return true;
  }

  start() {
    for (let i = 0; i < 10; i ++) if (this.create_walls()) break
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

