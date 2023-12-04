document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-login-register');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const username = document.getElementById("login-username").value;
        console.log(username);
        const password = document.getElementById("login-password").value;
        console.log(password);

        const data = {
            username: username,
            password: password,
        }

        fetch('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(data => {
            if(data.message === "Successfully check user") {
                window.alert("Successfully login");
                window.location.href = "http://127.0.0.1:5500/frontend/";
            } else {
                alert("Failed to login");
            }
        })
        .catch(error => console.error('Error logging in:', error));
    });
});
