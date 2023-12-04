

    document.addEventListener('DOMContentLoaded', (event) => {
    // when user click submit button, send user register data to backend
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.addEventListener('click', () => {
        event.preventDefault();
        const username = document.getElementById("register-username").value;
        console.log(username);
        const password = document.getElementById("register-password").value;
        console.log(password);
        const data = {
            username: username,
            password: password,
        }
        fetch('http://localhost:4000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(data => {
            if(data.message === "Successfully add a new user") {
                window.alert("Successfully add a new user");
               
            } else {
                alert("Failed to add a new user");
            }
        })
        .catch(error => console.error('Error adding a new user:', error));
    });
    });