function loop() {
  ajiSetLineCap("round");
  ajiSetFillColor("#ffffcc");
  ajiFillRect(0, 0, AJIPACK_WIDTH, AJIPACK_HEIGHT);
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
          (ajiGetHours() * Math.PI) / 6 + (ajiGetMinutes() * Math.PI) / 360
        ),
    AJIPACK_HEIGHT / 2 -
      50 *
        Math.cos(
          (ajiGetHours() * Math.PI) / 6 + (ajiGetMinutes() * Math.PI) / 360
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
          (ajiGetMinutes() * Math.PI) / 30 + (ajiGetSeconds() * Math.PI) / 1800
        ),
    AJIPACK_HEIGHT / 2 -
      80 *
        Math.cos(
          (ajiGetMinutes() * Math.PI) / 30 + (ajiGetSeconds() * Math.PI) / 1800
        ),
    "#0000cc",
    6
  );
  ajiLine(
    AJIPACK_WIDTH / 2,
    AJIPACK_HEIGHT / 2,
    AJIPACK_WIDTH / 2 + 90 * Math.sin((ajiGetSeconds() * Math.PI) / 30),
    AJIPACK_HEIGHT / 2 - 90 * Math.cos((ajiGetSeconds() * Math.PI) / 30),
    "#ff0000",
    2
  );
  ajiSetFont("14px sans-serif");
  ajiSetFillColor("black");
  ajiDrawAlignText(ajiGetDateString(), 0, 180, AJIPACK_WIDTH, "center");
  ajiDrawAlignText(ajiGetTimeString(), 0, 200, AJIPACK_WIDTH, "center");
}
