document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Get form data
    var formData = new FormData(this);

    // Send form data to server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'submit_registration.js'); // Replace 'submit_registration.php' with your actual form submission endpoint
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Handle successful response
        console.log(xhr.responseText); // Log the response from the server
        // You can update the UI or display a success message here
      } else {
        // Handle error
        console.error('Error:', xhr.statusText);
        // You can display an error message or handle the error in another way
      }
    };
    xhr.onerror = function() {
      // Handle network errors
      console.error('Network Error');
      // You can display an error message or handle the error in another way
    };
    xhr.send(formData); // Send form data to server
  });