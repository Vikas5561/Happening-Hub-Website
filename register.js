// register.js
document.addEventListener("DOMContentLoaded", function() {
    var registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form data
        var formData = new FormData(registerForm);
        var username = formData.get("username");
        var email = formData.get("email");
        var password = formData.get("password");

        // Simulate registration process (replace with actual registration logic)
        // Here, we're redirecting back to the previous page (user login page)
        setTimeout(function() {
            window.location.href = document.referrer; // Redirect to previous page
        }, 2000); // Delay in milliseconds (2 seconds)
    });
});
