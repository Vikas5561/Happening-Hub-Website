// JavaScript code for calculating total price based on selected options
document.addEventListener('DOMContentLoaded', function() {
    var checkboxes = document.querySelectorAll('input[name="eventOption"]');
    var totalPriceDisplay = document.getElementById('totalPrice');
    var totalPrice = 0;

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // Parse the value of the checkbox option to a float
            var optionPrice = parseFloat(this.value);

            if (this.checked) {
                // Checkbox is checked, add its value to total price
                totalPrice += optionPrice;
            } else {
                // Checkbox is unchecked, subtract its value from total price
                totalPrice -= optionPrice;
            }

            // Update total price display
            totalPriceDisplay.textContent = '$' + totalPrice.toFixed(2); // Display total price with 2 decimal places
        });
    });
});
