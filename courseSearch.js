// With Claude 3.5 Sonnet
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');

    if (!searchForm) {
        console.error('Search form not found');
        return;
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const keywords = document.getElementById('searchKeywords').value;
        const target = document.getElementById('searchTarget').value;
		const xuezhiRadio = document.querySelector('input[name="xuezhi"]:checked').value;

        if (!keywords || !target || !xuezhiRadio) {
            console.error('Missing required fields');
            return;
        }

        const xuezhi = xuezhiRadio.value;

        console.log('Search parameters:', { keywords, target, xuezhi });

        // Store search parameters in localStorage
        try {
            localStorage.setItem('searchKeywords', keywords);
            localStorage.setItem('searchTarget', target);
            localStorage.setItem('searchXuezhi', xuezhi);
            console.log('Search parameters stored in localStorage');
        } catch (error) {
            console.error('Error storing data in localStorage:', error);
        }

        // Redirect to the results page
        try {
            window.location.href = 'search-results.html';
            console.log('Redirecting to results page');
        } catch (error) {
            console.error('Error during redirection:', error);
        }
    });
});
