import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject {
  constructor(info, gamemap) {
    super();
    this.id = info.id;
    this.color = info.color;
    this.gamemap = gamemap;

    this.cells = [new Cell(info.r, info.c)]; // cells[0] 存放蛇的头
    this.next_cell = null; // 下一步的目标位置

    this.speed = 5; // 蛇每秒钟走的格子数
    this.direction = -1;
    this.status = "idle"; // "idle表示静止，等待输入进行下一步运动"

    this.dr = [-1, 0, 1, 0]; // 在二维数组地图中rows上四个方向的偏移量
    this.dc = [0, 1, 0, -1];

    this.step = 0; // 记录走了多少步
    this.eps = 1e-2;
  }

  start() {

  }

  set_direction(d) {
    this.direction = d;
  }

  check_tail_increasing() {
    if (this.step <= 10) return true;
    if (this.step % 3 === 1) return true;
    return false;
  }

  next_step() { // 蛇走下一步前的辅助函数，包括更改状态与方向
    const d = this.direction; // 目前direction的设置还没有编写
    this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
    this.direction = -1; // 在走了一步后清空操作
    this.status = "move";
    this.step ++;

    // 下一步操作窗墙/蛇，瞬间去世
    if (!this.gamemap.check_valid(this.next_cell)) {
      this.status = "die";
    }
    const k = this.cells.length;
    // 原cells的实际存储空间为[0,k-1]，这样是将从尾巴到头整体向后覆盖
    // 就会比原来多出来一个头
    // 每个元素都向后移动一位，相当于头部多出了一个原来头部的复制
    for (let i = k; i > 0; i --) {
      this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
    }
  }

  update_move() { // 进行移动的函数
    // 初始版可以理解为每一帧重新计算蛇头的位置，之后的render()里再画一遍
    // 这里的方法是两条蛇共有的
    // this.cells[0].x += this.speed * this.timedelta / 1000;
    const dx = this.next_cell.x - this.cells[0].x; // 这是圆心的位置
    const dy = this.next_cell.y - this.cells[0].y;
    const distance = Math.sqrt(dx * dx + dy * dy); // 这是代表当前蛇头位置到目标位置之间的欧氏距离
    // 蛇尾更新操作时整个if分支是一体的
    if (distance < this.eps) {
      this.cells[0] = this.next_cell; // 将目标点作为新的蛇头
      this.next_cell = null;
      this.status = "idle"; // 当前次移动结束，等待下一次移动机会
      // this.direction = -1;

      if (!this.check_tail_increasing()) {
        this.cells.pop();
      }
    } else {
      const move_distance = this.speed * this.timedelta / 1000; // 每两帧之间走的距离是一个固定的值
      // 这里相当于先计算要走的距离，然后分配到x轴和y轴
      // 关注蛇头，一切的cells[0]
      this.cells[0].x += move_distance * dx / distance; // x 轴的增量
      this.cells[0].y += move_distance * dy / distance;

      // if (this.id === 0) {
      //   if (this.direction === 0) this.cells[0].y -= move_distance;
      //   else if (this.direction === 1) this.cells[0].x += move_distance;
      //   else if (this.direction === 2) this.cells[0].y += move_distance;
      //   else if (this.direction === 3) this.cells[0].x -= move_distance;
      // }
      // if (this.id === 1) {
      //   if (this.direction === 0) this.cells[0].y -= move_distance;
      //   else if (this.direction === 1) this.cells[0].x += move_distance;
      //   else if (this.direction === 2) this.cells[0].y += move_distance
      //   else if (this.direction === 3) this.cells[0].x -= move_distance;
      // }
      
      // 这里是不变长蛇尾，蛇尾不变长就要向前移动，头是每一步都要向前伸
      if (!this.check_tail_increasing()) {
        const k = this.cells.length;
        const tail = this.cells[k - 1], tail_target = this.cells[k - 2];
        const tail_dx = tail_target.x - tail.x;
        const tail_dy = tail_target.y - tail.y;
        // distance和上面是公用的
        tail.x += move_distance * tail_dx / distance;
        tail.y += move_distance * tail_dy / distance;
      }
    }
  }

  update() {
    if (this.status === 'move') {
      this.update_move();
    }
    this.render();
  }

  render() {
    const ctx = this.gamemap.ctx;
    const L = this.gamemap.L;
    
    if (this.status === "die") this.color = "white";

    ctx.fillStyle = this.color;
    for (const cell of this.cells) {
      ctx.beginPath();
      ctx.arc(cell.x * L, cell.y * L, L / 2 * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 1; i < this.cells.length; i ++ ) {
      const a = this.cells[i - 1], b = this.cells[i];

      if (Math.abs(a.x - b.x)< this.eps) { // 蛇当前是纵方向的
        ctx.fillRect((a.x - 0.4)* L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L); // x维度、y维度
      } else { // 当前蛇是横方向的
        ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, L * 0.8); // x维度、y维度
      }
    }
  }
}



