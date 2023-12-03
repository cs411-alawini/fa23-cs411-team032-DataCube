document.addEventListener('DOMContentLoaded', (event) => {
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

    // submit receieve form
    const form = document.getElementById('category-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedCategories = [];
        const checkboxes = document.querySelectorAll('input[name="category"]:checked');
        checkboxes.forEach((checkbox) => {
            selectedCategories.push(checkbox.value);
        });

        console.log(selectedCategories);
    });
});
