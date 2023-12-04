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

    // Define a variable outside of your function to keep track of the chart instance
    let myChart;

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


//----------------------------------search bar -------------------------------------------------------
    // Modal event listeners
    searchBtn.addEventListener('click', () => {
        event.preventDefault();
        modal.style.display = "block";
        console.log("clicked");
        console.log(searchTerm.value);
        // You can add more code here to populate the modal with specific search results
        performSearch(searchTerm.value);
    });


    function performSearch(term){
        const url = `http://localhost:4000/video/?title=${encodeURIComponent(term)}`;
        fetch(url)
        .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            displayResult(data.data)
          })
          .catch(error => {
            console.error('Error search key word:', error);
          });        
    }

    function displayResult(results){
        searchResult.innerHTML = "";
        console.log(results);
        if(results.length > 0)
        {
            results.forEach((result,index) => {
                const listItem = document.createElement('div');
                listItem.className = 'search-result-item';
                listItem.setAttribute('data-video-id', result.videoID); 
                listItem.innerHTML = `
                    <div class="rank">${index + 1}</div>
                    <div class="videoID">${result.videoID}</div>
                    <div class="title" id = title_${result.videoID} contenteditable="true">${result.title}</div>
                    <div class="views">${result.view_count.toLocaleString()} views</div>
                    <button class="update-btn">Update</button>
                    <button class="delete-btn">Delete</button>
                `;
                searchResult.appendChild(listItem);
    
                // Add event listeners for buttons
                listItem.querySelector('.update-btn').addEventListener('click', () => updateVideo(result.videoID));
                listItem.querySelector('.delete-btn').addEventListener('click', () => deleteVideo(result.videoID));
            });
        }
        else 
        {
            searchResult.textContent = "No Result Found!";
        }
    }

    function updateVideo(videoID){
        // Make a request to the backend to update the video
        // Handle the response
        const title = document.getElementById(`title_${videoID}`).textContent;
        console.log(videoID);
        console.log(title);
        fetch('http://localhost:4000/video',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ videoID: videoID, title: title })
        }).then(response => response.json())
        .then(data => {
            if(data.message === "Successfully update video") {
                console.log("Successfully update video");
            } else {
                console.error('Failed to update video');
            }
        })
    }
    
    function deleteVideo(videoID){
        // Make a request to the backend to delete the video
        // Handle the response
        fetch('http://localhost:4000/video',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ videoID: videoID })
        }).then(response => response.json())
        .then(data => {
            if(data.message === "Successfully delete video") {
                console.log("Successfully delete video");
                removeVideoElement(videoID);
            } else {
                console.error('Failed to delete video');
            }
        })
    }

    function removeVideoElement(videoID) {
        // Assuming each video element has an id or data attribute associated with its videoID
        const videoElement = document.querySelector(`[data-video-id='${videoID}']`);
        if (videoElement) {
            videoElement.remove();
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
    


//-----------------------------------------------------button for category ---------------------------------   
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

        // Construct the URL with query parameters for the date range
        const queryURL = new URL('http://localhost:4000/video/time_stamp');
        queryURL.searchParams.append('start', fromDate);
        queryURL.searchParams.append('end', toDate);

        // Send the GET request to the server with the date range
        fetch(queryURL)
            .then(response => response.json())
            .then(data => {
                // Handle response data
                console.log('Videos by time stamp:', data);
                if(data.message === "Successfully get video by time stamp") {
                    console.log('Data for chart:', data);
                    createChart(data.data); // Call function to create chart with the data
                } else {
                    console.error('No data received for the given time range');
                }
            })
            .catch(error => {
                console.error('Error fetching videos by time stamp:', error);
            });
    });

    function createChart(videoData) {
        console.log('Creating chart with data:', videoData);
        const canvas = document.getElementById('time-chart');
        if (!canvas) {
            console.error('The canvas element was not found in the DOM');
            return;
        }
    
        const ctx = canvas.getContext('2d');
        const labels = videoData.map(item => new Date(item.published_at).toLocaleDateString());
        const counts = videoData.map(item => item['count']);
    
        console.log('Labels:', labels);
        console.log('Counts:', counts);
    
        // If myChart is not null, destroy it before creating a new one
        if (myChart instanceof Chart) { // More robust check
            myChart.destroy();
        }
    
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Video Count',
                    data: counts,
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});
