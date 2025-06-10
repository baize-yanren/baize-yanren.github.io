// 存储鸡汤文学的字典
const chickenSoupDict = {};

async function fetchChickenSoupQuotes() {
    try {
        console.log('开始请求鸡汤文件');
        const response = await fetch('src/chicken_soup.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('成功获取鸡汤数据:', data);
        Object.assign(chickenSoupDict, data);
        return Object.keys(chickenSoupDict);
    } catch (error) {
        console.error('读取鸡汤文件时出错:', error);
        return [];
    }
}

function getRandomQuote(quoteNumbers) {
    if (quoteNumbers.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * quoteNumbers.length);
    const randomNumber = quoteNumbers[randomIndex];
    return chickenSoupDict[randomNumber];
}

async function displayRandomQuote() {
    console.log('开始显示随机鸡汤');
    const quoteNumbers = await fetchChickenSoupQuotes();
    const quote = getRandomQuote(quoteNumbers);
    const chickenSoupCard = document.getElementById('chicken-soup-card');
    if (chickenSoupCard) {
        console.log('找到 chicken-soup-card 元素，准备显示鸡汤:', quote);
        chickenSoupCard.textContent = quote;
    } else {
        console.error('未找到 id 为 chicken-soup-card 的元素');
    }
}

window.addEventListener('load', displayRandomQuote);