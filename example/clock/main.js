function loop() {
  ajiSetLineCap("round");
  ajiSetFillColor("#ffffcc");
  ajiFillRect(0, 0, AJIPACK_WIDTH, AJIPACK_HEIGHT);
  ajiSetFillColor("#000");
  ajiFillCircle(
    AJIPACK_WIDTH / 2 - AJIPACK_HEIGHT / 2 + 10,
    10,
    AJIPACK_HEIGHT - 20,
    AJIPACK_HEIGHT - 20
  );
  ajiSetFillColor("#fff");
  ajiFillCircle(
    AJIPACK_WIDTH / 2 - AJIPACK_HEIGHT / 2 + 12,
    12,
    AJIPACK_HEIGHT - 24,
    AJIPACK_HEIGHT - 24
  );
  ajiSetStrokeColor("#0000cc");
  ajiSetLineWidth(12);
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
        )
  );
  ajiSetLineWidth(6);
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
        )
  );
  ajiSetStrokeColor("#ff0000");
  ajiSetLineWidth(2);
  ajiLine(
    AJIPACK_WIDTH / 2,
    AJIPACK_HEIGHT / 2,
    AJIPACK_WIDTH / 2 + 90 * Math.sin((ajiGetSeconds() * Math.PI) / 30),
    AJIPACK_HEIGHT / 2 - 90 * Math.cos((ajiGetSeconds() * Math.PI) / 30)
  );
  ajiSetFont("14px sans-serif");
  ajiSetFillColor("black");
  ajiDrawAlignText(ajiGetDateString(), 0, 180, AJIPACK_WIDTH, "center");
  ajiDrawAlignText(ajiGetTimeString(), 0, 200, AJIPACK_WIDTH, "center");
}
