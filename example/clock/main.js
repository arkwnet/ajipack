function loop() {
  const date = new Date();
  ajiSetLineCap("round");
  ajiFillRect(0, 0, AJIPACK_WIDTH, AJIPACK_HEIGHT, "#ffffcc");
  ajiFillCircle(
    AJIPACK_WIDTH / 2 - AJIPACK_HEIGHT / 2 + 10,
    10,
    AJIPACK_HEIGHT - 20,
    AJIPACK_HEIGHT - 20,
    "#000"
  );
  ajiFillCircle(
    AJIPACK_WIDTH / 2 - AJIPACK_HEIGHT / 2 + 12,
    12,
    AJIPACK_HEIGHT - 24,
    AJIPACK_HEIGHT - 24,
    "#fff"
  );
  ajiLine(
    AJIPACK_WIDTH / 2,
    AJIPACK_HEIGHT / 2,
    AJIPACK_WIDTH / 2 +
      50 *
        Math.sin(
          (date.getHours() * Math.PI) / 6 + (date.getMinutes() * Math.PI) / 360
        ),
    AJIPACK_HEIGHT / 2 -
      50 *
        Math.cos(
          (date.getHours() * Math.PI) / 6 + (date.getMinutes() * Math.PI) / 360
        ),
    "#0000cc",
    12
  );
  ajiLine(
    AJIPACK_WIDTH / 2,
    AJIPACK_HEIGHT / 2,
    AJIPACK_WIDTH / 2 +
      80 *
        Math.sin(
          (date.getMinutes() * Math.PI) / 30 +
            (date.getSeconds() * Math.PI) / 1800
        ),
    AJIPACK_HEIGHT / 2 -
      80 *
        Math.cos(
          (date.getMinutes() * Math.PI) / 30 +
            (date.getSeconds() * Math.PI) / 1800
        ),
    "#0000cc",
    6
  );
  ajiLine(
    AJIPACK_WIDTH / 2,
    AJIPACK_HEIGHT / 2,
    AJIPACK_WIDTH / 2 + 90 * Math.sin((date.getSeconds() * Math.PI) / 30),
    AJIPACK_HEIGHT / 2 - 90 * Math.cos((date.getSeconds() * Math.PI) / 30),
    "#ff0000",
    2
  );
  ajiSetFont("14px sans-serif");
  ajiSetFillColor("black");
  ajiDrawAlignText(date.toLocaleDateString(), 0, 180, AJIPACK_WIDTH, "center");
  ajiDrawAlignText(date.toLocaleTimeString(), 0, 200, AJIPACK_WIDTH, "center");
}
