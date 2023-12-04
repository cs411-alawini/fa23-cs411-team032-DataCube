document.addEventListener('DOMContentLoaded', (event) => {
    // Object to hold categoryName to categoryID mapping
    const categoryIdMapping = {};

    // Fetch categories from the server and create checkboxes
    const categoriesContainer = document.querySelector('.categories');
    const form = document.getElementById('category-form');
    const modal = document.getElementById("popup-modal");
    const searchBtn = document.getElementById("search-button");
    const closeBtn = document.querySelector(".close");
    var searchTerm = document.getElementById("search-input");
    var searchResult = document.getElementById("searchResult");

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
    fetch('http://localhost:4000/video/top_trending_all') // Replace with your actual endpoint
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
        console.log("clicked");
        console.log(searchTerm.value);
        // You can add more code here to populate the modal with specific search results
        var result = performSearch(searchTerm.value);
        displayResult(result);
    });


    function performSearch(term){
        fetch("http://localhost:4000/video/")
            .then(response => response.json())
            .then(data => {
                
            })
        return term;
    }

    function displayResult(result){
        searchResult.innerHTML = "";
        if(result.length > 0)
        {
            searchResult.textContent = result;//temp
        }
        else 
        {
            searchResult.textContent = "No Result Found!";
        }
    }

    // When the user clicks on the close button, close the modal
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

    const dateRangeForm = document.getElementById('date-range-form');
    dateRangeForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values of the date inputs
        const fromDate = document.getElementById('from-date').value;
        const toDate = document.getElementById('to-date').value;

        // Create an object with the date range
        const dateRange = {
            from: fromDate,
            to: toDate
        };

        console.log('Date Range Submitted:', dateRange);

        // Send the date range to the server
        fetch('http://localhost:4000/video/top_trending_all', { // Replace with your actual endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dateRange)
        })
        .then(response => response.json())
        .then(data => {
            // Handle response data
            console.log('Response from server:', data);
            // You may want to do something with the response here
        })
        .catch(error => {
            console.error('Error sending date range:', error);
        });
    });
});
