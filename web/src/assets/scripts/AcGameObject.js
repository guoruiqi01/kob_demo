const AC_GAME_OBJECTS = [];

export class AcGameObject {
  constructor() {
    AC_GAME_OBJECTS.push(this);
    this.timedelta = 0; // 上一帧与当前帧之间的时间间隔
    this.has_called_start = false;
  }

  start() { // 只执行一次

  }

  update() { // 每一帧执行一次，除了第一帧之外

  }

  on_destroy() { // 在删除之前执行

  }

  destroy() {
    for (let i in AC_GAME_OBJECTS) {
      const obj = AC_GAME_OBJECTS[i];
      if (obj == this) {
        AC_GAME_OBJECTS.splice(i);
        break;
      }
    }
  }
}


let last_timestamp; // 上一帧执行的时刻
const step = (timestamp) => {
  for (let obj of AC_GAME_OBJECTS) {
    if (!obj.has_called_start) {
      // 如果游戏没有加载到页面，则进行加载
      obj.start();
      obj.has_called_start = true;
    } else {
      // 如果已经加载，则进行更新
      obj.timedelta = timestamp - last_timestamp;
      obj.update();
    }
  }
  requestAnimationFrame(step)
}

requestAnimationFrame(step)