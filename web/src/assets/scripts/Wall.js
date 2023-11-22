import { AcGameObject } from "./AcGameObject"

export class Wall extends AcGameObject {
  constructor(r, c, gamemap) {
    super();
    this.r = r;
    this.c = c;
    this.gamemap = gamemap;
    this.color = "#B37226";
  }

  update() {
    this.render();
  }

  render() {
    const L = this.gamemap.L;
    const ctx = this.gamemap.ctx;

    ctx.fillStyle = this.color;
    // 一开始push进来的是(r,c)，但是实际画的时候是(c,r)
    ctx.fillRect(this.c * L, this.r * L, L, L);
  }
}