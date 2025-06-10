// 这里可以添加交互逻辑，例如表单验证等
console.log('个人网站已加载');

// 黑暗模式切换逻辑
const darkModeToggle = document.getElementById('dark-mode-toggle');
// 页面加载时读取模式状态
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const newMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', newMode);
    });
}