document.addEventListener('DOMContentLoaded', async () => {
    const resultsDiv = document.getElementById('results');

    const keywords = localStorage.getItem('searchKeywords');
    const target = localStorage.getItem('searchTarget');
    const xuezhi = localStorage.getItem('searchXuezhi');

    if (!keywords || !target || !xuezhi) {
        resultsDiv.innerHTML = '系統偵測到您並未選擇／輸入查詢條件，請回到搜尋頁面，重新嘗試。';
        return;
    }

    try {
        const response = await fetchSearchResults(keywords, target, xuezhi);
        const table = extractTable(response);
        displayResults(table);
        exportButton.style.display = 'block';
        exportButton.addEventListener('click', () => exportTable(table));
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = 'An error occurred while searching. Please try again.';
    }
});

async function fetchSearchResults(keywords, target, xuezhi) {
    
	if (target=='teacher')
	{
		const apiUrl = `https://sea.cc.ntpu.edu.tw/pls/dev_stud/course_query_all.queryByKeyword?qYear=113&qTerm=1&courseno=${encodeURIComponent(xuezhi)}&cour=&teach=${encodeURIComponent(keywords)}&week=&seq1=A&seq2=M`;
	}
	else if (target=='course')
	{
		const apiUrl = `https://sea.cc.ntpu.edu.tw/pls/dev_stud/course_query_all.queryByKeyword?qYear=113&qTerm=1&courseno=${encodeURIComponent(xuezhi)}&cour=${encodeURIComponent(keywords)}&teach=&week=&seq1=A&seq2=M`;
	}
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('API request failed');
    }
    return await response.text();
}

function displayResults(table) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    resultsDiv.appendChild(table.cloneNode(true));
}
