document.addEventListener('DOMContentLoaded', (event) => {
    // Dynamically generate category checkboxes
    const categoriesContainer = document.querySelector('.categories');
    for (let i = 1; i <= 21; i++) {
        let categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.id = 'category' + i;
        input.name = 'category';
        input.value = 'cat' + i;

        let label = document.createElement('label');
        label.htmlFor = 'category' + i;
        label.textContent = 'Category ' + i;

        categoryDiv.appendChild(input);
        categoryDiv.appendChild(label);

        categoriesContainer.appendChild(categoryDiv);
    }

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

    // When the user clicks the search button, open the modal
    searchBtn.addEventListener('click', () => {
        modal.style.display = "block";
        // console.log("clicked");
    });

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
