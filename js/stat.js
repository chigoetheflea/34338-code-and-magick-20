'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_TITLE_Y = CLOUD_Y + 30;
var GRAPH_Y = CLOUD_Y + 100;
var GRAPH_MAX_HEIGHT = 150;
var BAR_TEXT_HEIGHT = 20;
var BAR_MAX_HEIGHT = GRAPH_MAX_HEIGHT - 2 * BAR_TEXT_HEIGHT;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var COLOR_SELF = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.save();

  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.restore();
};

var getMaxTime = function (arr) {
  if (arr.length) {
    var max = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }

    return max;
  }

  return false;
};

var renderTitle = function (ctx, x, y, text) {
  ctx.fillText(text, x, y);
};

var setRandomSaturation = function (hue, lightness) {
  return 'hsl(' + hue + ',' + Math.random() * 100 + '%,' + lightness + '%)';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';

  renderTitle(ctx, CLOUD_X + CLOUD_WIDTH / 2, CLOUD_TITLE_Y, 'Ура вы победили!');
  renderTitle(ctx, CLOUD_X + CLOUD_WIDTH / 2, CLOUD_TITLE_Y + 20, 'Список результатов:');

  var maxTime = getMaxTime(times);
  var firstBarMargin = CLOUD_X + (CLOUD_WIDTH - ((BAR_WIDTH + BAR_GAP) * players.length - BAR_GAP)) / 2;

  for (var i = 0; i < players.length; i++) {
    times[i] = Math.round(times[i]);

    var barHeight = Math.round(BAR_MAX_HEIGHT * times[i] / maxTime);
    var barMarginTop = GRAPH_Y + BAR_MAX_HEIGHT - barHeight;
    var barMarginLeft = firstBarMargin + (BAR_GAP + BAR_WIDTH) * i;

    ctx.fillText(times[i], barMarginLeft + BAR_WIDTH / 2, barMarginTop);

    ctx.save();

    ctx.fillStyle = players[i] === 'Вы' ? COLOR_SELF : setRandomSaturation(245, 50);

    ctx.fillRect(barMarginLeft, barMarginTop + BAR_TEXT_HEIGHT, BAR_WIDTH, barHeight);

    ctx.restore();

    ctx.fillText(players[i], barMarginLeft + BAR_WIDTH / 2, barMarginTop + barHeight + BAR_TEXT_HEIGHT + 10);
  }
};
