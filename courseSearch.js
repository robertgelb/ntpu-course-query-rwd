// With Claude 3.5 Sonnet
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const keywords = document.getElementById('searchKeywords').value;
        const target = document.getElementById('searchTarget').value;
        const xuezhi = document.querySelector('input[name="xuezhi"]:checked').value;

        // Store search parameters in localStorage
        localStorage.setItem('searchKeywords', keywords);
        localStorage.setItem('searchTarget', target);
        localStorage.setItem('searchXuezhi', xuezhi);

        // Redirect to the results page
        window.location.href = 'search-result.html';
    });
});
