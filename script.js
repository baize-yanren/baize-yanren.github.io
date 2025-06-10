// 生成日历的函数
function generateCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // 创建日历头部
    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.textContent = `${year} 年 ${month + 1} 月`;
    calendarContainer.appendChild(header);

    // 创建日历网格
    const calendar = document.createElement('div');
    calendar.className = 'calendar';

    // 填充空白日期
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendar.appendChild(emptyDay);
    }

    // 填充日期
    const lastDay = new Date(year, month + 1, 0);
    const numDays = lastDay.getDate();
    for (let i = 1; i <= numDays; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        calendar.appendChild(day);
    }

    calendarContainer.appendChild(calendar);
}

// 处理骑行记录表单提交
document.getElementById('ride-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('ride-date').value;
    const time = document.getElementById('ride-time').value;
    const distance = document.getElementById('ride-distance').value;

    const record = {
        date: date,
        time: time,
        distance: distance
    };

    // 保存记录到本地存储
    let records = JSON.parse(localStorage.getItem('rideRecords')) || [];
    records.push(record);
    localStorage.setItem('rideRecords', JSON.stringify(records));

    // 清空表单
    this.reset();

    // 刷新记录列表
    displayRecords();
});

// 显示骑行记录
function displayRecords() {
    const recordsList = document.getElementById('records-list');
    recordsList.innerHTML = '';

    const records = JSON.parse(localStorage.getItem('rideRecords')) || [];
    records.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.date}: 骑行时间 ${record.time} 分钟，骑行距离 ${record.distance} 公里`;
        recordsList.appendChild(li);
    });
}

// 页面加载完成后生成日历并显示记录
window.addEventListener('load', () => {
    generateCalendar();
    displayRecords();
});
// 这里可以添加交互逻辑，例如表单验证等
console.log('个人网站已加载');