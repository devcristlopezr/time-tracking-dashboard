const times = document.querySelectorAll('.button');
const activities = document.querySelectorAll('.statistics_card');

let dataTime = [];
fetch('data.json')
  .then((res) => res.json())
  .then((data) => {
    dataTime = data;
    searchInfo(data, 'daily');
  });

searchInfo = (data, time) => {
  let time_data = [];
  data.forEach((activity) => {
    const { title } = activity;
    const { [time]: timeActivity } = activity.timeframes;
    const current = timeActivity.current;
    const previous = timeActivity.previous;
    time_data.push({ title, current, previous });
  });
  showInfo(time_data);
};

showInfo = (time_data) => {
  for (let i = 0; i < time_data.length; i++) {
    activities[i].firstElementChild.lastElementChild.firstElementChild.innerText = time_data[i].current + 'hrs';
    activities[i].firstElementChild.lastElementChild.lastElementChild.innerText = 'Previous - ' + time_data[i].previous + ' hrs';
    if (time_data[i].current === 1) {
      activities[i].firstElementChild.lastElementChild.firstElementChild.innerText = time_data[i].current + 'hr';
    }
    if (time_data[i].previous === 1) {
      activities[i].firstElementChild.lastElementChild.lastElementChild.innerText = 'Previous - ' + time_data[i].previous + ' hr';
    }
  }
};

times.forEach((time) => {
  time.addEventListener('click', () => {
    searchInfo(dataTime, time.id);
  });
});
