document.addEventListener('DOMContentLoaded', (event) => {
    // Object to hold categoryName to categoryID mapping
    const categoryIdMapping = {};

    // Fetch categories from the server and create checkboxes
    const categoriesContainer = document.querySelector('.categories');
    const form = document.getElementById('category-form');
    const modal = document.getElementById("popup-modal");
    const searchBtn = document.getElementById("search-button");
    const closeBtn = document.querySelector(".close");

    // Function to update video rankings on the page
    function updateVideoRankings(videos) {
        const rankingContainer = document.getElementById('ranking-placeholder');
        rankingContainer.innerHTML = ''; // Clear existing content
        videos.forEach((video, index) => {
            const listItem = document.createElement('div');
            listItem.className = 'video-ranking-item';
            listItem.innerHTML = `
                <div class="rank">${index + 1}</div>
                <div class="title">${video.title}</div>
                <div class="views">${video.view_count.toLocaleString()} views</div>
            `;
            rankingContainer.appendChild(listItem);
        });
    }

    // Fetch and display top ten videos for all categories when the page loads
    fetch('http://localhost:4000/video/top_all_categories') // Replace with your actual endpoint
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                updateVideoRankings(data.data);
            } else {
                console.error('Failed to fetch top videos for all categories');
            }
        })
        .catch(error => console.error('Error fetching top videos for all categories:', error));

    // Fetch categories and create checkboxes
    fetch('http://localhost:4000/category')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(category => {
                categoryIdMapping[category.categoryName.trim()] = category.categoryID;

                let categoryDiv = document.createElement('div');
                categoryDiv.className = 'category';

                let input = document.createElement('input');
                input.type = 'checkbox';
                input.id = 'category' + category.categoryID;
                input.name = 'category';
                input.value = category.categoryName.trim();

                let label = document.createElement('label');
                label.htmlFor = 'category' + category.categoryID;
                label.textContent = category.categoryName.trim();

                categoryDiv.appendChild(input);
                categoryDiv.appendChild(label);
                categoriesContainer.appendChild(categoryDiv);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));

    // Modal event listeners
    searchBtn.addEventListener('click', () => {
        modal.style.display = "block";
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
    
    // Form submission event
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedCategoriesNames = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(checkbox => checkbox.value);
        const selectedCategoriesIds = selectedCategoriesNames.map(name => categoryIdMapping[name]);
        console.log(selectedCategoriesIds);

        // Send the category IDs to the server and update the rankings
        fetch('http://localhost:4000/video/top_trending', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryIDs: selectedCategoriesIds })
        })
        .then(response => response.json())
        .then(data => {
            updateVideoRankings(data.data);
        })
        .catch(error => {
            console.error('Error posting category IDs:', error);
        });
    });
});
