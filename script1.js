// JavaScript code for Event Management System login page functionality
document.addEventListener("DOMContentLoaded", function() {
    const signupLink = document.getElementById("signupLink");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    const adminLoginLink = document.getElementById("adminLoginLink");
    const loginForm = document.getElementById("loginForm");

    signupLink.addEventListener("click", goToSignUpPage);
    forgotPasswordLink.addEventListener("click", goToForgotPasswordPage);
    adminLoginLink.addEventListener("click", goToAdminLoginPage);
    loginForm.addEventListener("submit", loginUser);

    function goToSignUpPage(event) {
        event.preventDefault();
        // Redirect to sign up page
        window.location.href = "signup.html";
    }

    function goToForgotPasswordPage(event) {
        event.preventDefault();
        // Redirect to forgot password page
        window.location.href = "forgot-password.html";
    }

    function goToAdminLoginPage(event) {
        event.preventDefault();
        // Redirect to admin login page
        window.location.href = "admin-login.html";
    }

    function loginUser(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // You can add AJAX request here to validate user credentials
        // Upon successful login, redirect user to dashboard page
        window.location.href = "dashboard.html";
    }
});