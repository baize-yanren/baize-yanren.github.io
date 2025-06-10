// 当前显示的年份和月份
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

// 生成日历的函数
function generateCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    calendarContainer.innerHTML = '';

    // 创建日历头部
    const header = document.createElement('div');
    header.className = 'calendar-header';

    // 左箭头
    const leftArrow = document.createElement('span');
    leftArrow.className = 'calendar-arrow';
    leftArrow.textContent = '<';
    leftArrow.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar();
    });
    header.appendChild(leftArrow);

    // 年月选择下拉栏
    const yearSelect = document.createElement('select');
    yearSelect.classList.add('year-select'); // 添加类名以便在 CSS 中调整样式
    for (let y = currentYear - 20; y <= currentYear + 20; y++) {
        const option = document.createElement('option');
        option.value = y;
        option.textContent = y;
        if (y === currentYear) {
            option.selected = true;
        }
        yearSelect.appendChild(option);
    }
    yearSelect.addEventListener('change', () => {
        currentYear = parseInt(yearSelect.value);
        generateCalendar();
    });

    const monthSelect = document.createElement('select');
    for (let m = 1; m <= 12; m++) {
        const option = document.createElement('option');
        option.value = m - 1;
        option.textContent = m;
        if (m === currentMonth + 1) {
            option.selected = true;
        }
        monthSelect.appendChild(option);
    }
    monthSelect.addEventListener('change', () => {
        currentMonth = parseInt(monthSelect.value);
        generateCalendar();
    });

    const selectContainer = document.createElement('div');
    selectContainer.className = 'year-month-select';
    selectContainer.appendChild(yearSelect);
    selectContainer.appendChild(document.createTextNode(' 年 '));
    selectContainer.appendChild(monthSelect);
    selectContainer.appendChild(document.createTextNode(' 月 '));
    header.appendChild(selectContainer);

    // 右箭头
    const rightArrow = document.createElement('span');
    rightArrow.className = 'calendar-arrow';
    rightArrow.textContent = '>';
    rightArrow.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar();
    });
    header.appendChild(rightArrow);

    calendarContainer.appendChild(header);

    // 添加返回今日按钮
    const todayButton = document.createElement('button');
    todayButton.className = 'today-button';
    todayButton.textContent = '返回今日';
    todayButton.addEventListener('click', () => {
        const now = new Date();
        currentYear = now.getFullYear();
        currentMonth = now.getMonth();
        generateCalendar();
    });
    calendarContainer.appendChild(todayButton);

    // 创建日历网格
    const calendar = document.createElement('div');
    calendar.className = 'calendar';

    // 创建星期表头
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    weekDays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day calendar-header-day';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // 填充空白日期
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDay.getDay();
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendar.appendChild(emptyDay);
    }

    // 填充日期
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const numDays = lastDay.getDate();
    const now = new Date();
    const currentDate = now.getDate();
    const currentDisplayYear = now.getFullYear();
    const currentDisplayMonth = now.getMonth();

    for (let i = 1; i <= numDays; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;

        // 高亮显示今天
        if (currentYear === currentDisplayYear && currentMonth === currentDisplayMonth && i === currentDate) {
            day.classList.add('today');
        }

        calendar.appendChild(day);
    }

    // 填充剩余空白日期，使最后一行完整
    const totalCells = calendar.children.length;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
        for (let i = 0; i < remainingCells; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            calendar.appendChild(emptyDay);
        }
    }

    calendarContainer.appendChild(calendar);
}

// 页面加载完成后生成日历
window.addEventListener('load', () => {
    generateCalendar();
});