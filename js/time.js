// 显示时间的函数
function updateTime() {
    const timeCard = document.getElementById('time-card');
    if (timeCard) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeCard.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// 页面加载完成后开始更新时间
window.addEventListener('load', () => {
    updateTime();
    setInterval(updateTime, 1000); // 每秒更新一次时间
});