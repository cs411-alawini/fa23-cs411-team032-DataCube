document.addEventListener('DOMContentLoaded', (event) => {
    // Fetch categories from the server and create checkboxes
    const categoriesContainer = document.querySelector('.categories');
    
    fetch('http://localhost:4000/category')
        .then(response => response.json())
        .then(data => {
            if(data.message === "Successfully get all categories") {
                data.data.forEach(category => {
                    let categoryDiv = document.createElement('div');
                    categoryDiv.className = 'category';
                    
                    let input = document.createElement('input');
                    input.type = 'checkbox';
                    input.id = 'category' + category.categoryID;
                    input.name = 'category';
                    input.value = category.categoryName.trim(); // Assuming categoryName is a string
                    
                    let label = document.createElement('label');
                    label.htmlFor = 'category' + category.categoryID;
                    label.textContent = category.categoryName.trim(); // Using trim to remove any trailing newline characters
                    
                    categoryDiv.appendChild(input);
                    categoryDiv.appendChild(label);
                    
                    categoriesContainer.appendChild(categoryDiv);
                });
            } else {
                console.error('Failed to fetch categories');
            }
        })
        .catch(error => console.error('Error fetching categories:', error));

    // Form submission event
    const form = document.getElementById('category-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(checkbox => checkbox.value);
        console.log(selectedCategories); // Do something with the selected categories
    });

    // Modal functionality
    const modal = document.getElementById("popup-modal"); // Change "myModal" to your modal's ID
    const searchBtn = document.getElementById("search-button"); // Change "searchBtn" to your search button's ID
    const closeBtn = document.querySelector(".close"); // Use the close class inside your modal
    var searchTerm = document.getElementById("search-input");
    var searchResult = document.getElementById("searchResult");

    // When the user clicks the search button, open the modal
    searchBtn.addEventListener('click', () => {
        modal.style.display = "block";
        console.log("clicked");
        console.log(searchTerm.value);
        // You can add more code here to populate the modal with specific search results
        var result = performSearch(searchTerm.value);
        displayResult(result);
    });


    function performSearch(term){
        var result;

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

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
