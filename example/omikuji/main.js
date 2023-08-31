const data = [
  {
    name: "大吉",
    rate: 0.01,
  },
  {
    name: "中吉",
    rate: 0.14,
  },
  {
    name: "小吉",
    rate: 0.15,
  },
  {
    name: "末吉",
    rate: 0.25,
  },
  {
    name: "吉",
    rate: 0.2,
  },
  {
    name: "凶",
    rate: 0.15,
  },
  {
    name: "大凶",
    rate: 0.1,
  },
];

let result = -1;

function loop() {
  ajiSetFillColor("#ffffcc");
  ajiFillRect(0, 0, AJIPACK_WIDTH, AJIPACK_HEIGHT);
  ajiSetFont("60px sans-serif");
  ajiSetFillColor("black");
  if (result < 0) {
    ajiDrawAlignText("", 0, 100, AJIPACK_WIDTH, "center");
  } else {
    ajiDrawAlignText(data[result].name, 0, 100, AJIPACK_WIDTH, "center");
  }
  if (ajiClick()) {
    const number = Math.random();
    let temp = 0.0;
    for (let i = 0; i < data.length; i++) {
      temp += data[i].rate;
      if (temp >= number) {
        result = i;
        break;
      }
    }
  }
}
