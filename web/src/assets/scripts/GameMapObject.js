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
    if (this.store.state.record.is_record) { // 进行录像回放
      let k = 0; // 记录执行到第几步操作了
      const interval_id = setInterval(() => { // 存储id用于取消
        const a_steps = this.store.state.record.a_steps;
        const b_steps = this.store.state.record.b_steps;
        const [snake0, snake1] = this.snakes;
        const loser = this.store.state.record.record_loser;

        if (k >= a_steps.length - 1) { // 最后一步不算，不复现，直接die
          if (loser === "all" || loser === "A") {
            snake0.status = "die";
          }
          if (loser === "all" || loser === "B") {
            snake1.status = "die";
          }
          clearInterval(interval_id);
        } else {
          snake0.set_direction(parseInt(a_steps[k]));
          snake1.set_direction(parseInt(b_steps[k]));
        }
        k ++;
      }, 300);
    } else {
      this.ctx.canvas.focus();
      this.ctx.canvas.addEventListener("keydown", e => {
        let d = -1;
        if (e.key === 'w') d = 0;
        else if (e.key === 'd') d = 1;
        else if (e.key === 's') d = 2;
        else if (e.key === 'a') d = 3;
  
        if (d >= 0) {
          this.store.state.pk.socket.send(JSON.stringify({
            event: "move",
            direction: d, 
          }))
        }
      })
    }
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

