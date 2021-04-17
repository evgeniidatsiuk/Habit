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

function formatDate(d) {
  const date = d.getDate();
  const weekday = formatWeekday(d.getDay());

  d = { date, weekday };
  return d;
}

export default function getLast5Days() {
  const last5Days = [];

  for (let i = 5; i >= 0; i--) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i);

    last5Days.push(formatDate(currentDate));
  }

  return last5Days;
}
