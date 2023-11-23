export class Cell {
  // Cell是一个蛇的最小单位
  constructor(r, c) {
    this.r = r;
    this.c = c;
    // 进行矩阵地图和canvas坐标转换
    // 为什么是0.5？二维矩阵中两个点之间的距离是1
    // 在矩阵中没法通过0.5进行索引，如[1.5][1.5]，但是canvas里是可以的，因为他是整个二维平面
    this.x = this.c + 0.5;
    this.y = this.r + 0.5;
  }
}