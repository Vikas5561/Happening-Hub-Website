// JavaScript code for handling the "Book Event" button click event
function bookEvent() {
    // Check if the user is logged in (you need to implement this logic)
    var isLoggedIn = checkUserLoginStatus(); // Function to check if user is logged in

    if (isLoggedIn) {
        // If user is logged in, redirect to the registration page
        window.location.href = "registration.html"; // Replace "registration.html" with the URL of your registration page
    } else {
        // If user is not logged in, show the login modal
        var modal = document.getElementById("loginModal");
        modal.style.display = "block";

        // Close the modal when the user clicks on the close button
        var closeBtn = document.getElementsByClassName("close")[0];
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }

        // Close the modal when the user clicks anywhere outside of it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}

// Function to check if the user is logged in (dummy function)
function checkUserLoginStatus() {
    // Implement your logic to check if the user is logged in
    // For demonstration purposes, let's assume the user is logged in
    return true;
}
