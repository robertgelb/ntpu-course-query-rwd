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
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = 'An error occurred while searching. Please try again.';
    }
});



async function fetchSearchResults(keywords, target, xuezhi) {
    
    const apiUrl = new URL('https://sea.cc.ntpu.edu.tw/pls/dev_stud/course_query_all.queryByKeyword');
	
    apiUrl.searchParams.append('qYear', '113');
    apiUrl.searchParams.append('qTerm', '1');
    apiUrl.searchParams.append('courseno', xuezhi);
    
    //搜尋教師姓名或課程名稱
	if (target === 'teacher') {
        apiUrl.searchParams.append('teach', keywords);
        apiUrl.searchParams.append('cour', '');
    } else if (target === 'course') {
        apiUrl.searchParams.append('cour', keywords);
        apiUrl.searchParams.append('teach', '');
    }
	
	//星期幾、節次
    apiUrl.searchParams.append('week', '');
    apiUrl.searchParams.append('seq1', 'A');
    apiUrl.searchParams.append('seq2', 'M');

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('API request failed');
    }
    return await response.text();
}

function extractTable(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');
    if (!table) {
        throw new Error('No table found in the response');
    }
    return table;
}

function displayResults(table) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    resultsDiv.appendChild(table.cloneNode(true));
}
