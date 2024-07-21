// JavaScript code for sign-up page functionality
document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", signUpUser);

    function signUpUser(event) {
        event.preventDefault();
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // You can add AJAX request here to register the user
        // Upon successful registration, redirect user to login page
        window.location.href = "event-management-login.html";
    }
});