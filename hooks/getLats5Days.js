function formatWeekday(wd) {
  switch (wd) {
    case 0:
      wd = 'Нд';
      break;
    case 1:
      wd = 'Пн';
      break;
    case 2:
      wd = 'Вт';
      break;
    case 3:
      wd = 'Ср';
      break;
    case 4:
      wd = 'Чт';
      break;
    case 5:
      wd = 'Пт';
      break;
    case 6:
      wd = 'Сб';
      break;
  }

  return wd;
}

function formateDate(d) {
  const date = d.getDate();
  const weekday = formatWeekday(d.getDay());

  d = { date, weekday };
  return d;
}

export default function getLast5Days() {
  var result = [];
  for (var i = 5; i > 0; i = i - 1) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(formateDate(d));
  }

  return result;
}
