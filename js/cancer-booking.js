// Javascript function to get the title from cancer card
function bookNow(button) {
    // Get the cancer card title
    const title = button.closest('.cancer-card-body').querySelector('.cancer-card-title').innerText;

    // Redirect to the cancer screening page with the title as a URL parameter
    const encodedTitle = encodeURIComponent(title);
    window.location.href = `cancer-screening.html?title=${encodedTitle}`;
}

function bookSlot() {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const userType = document.getElementById("user-type").value;
    const matricNumber = document.getElementById("matric-number").value.trim();
    const school = document.getElementById("school").value.trim();
    const slot = document.getElementById("slot").value;

    // Check if any required fields are empty
    if (!firstName || !lastName || !email || !slot || (userType === 'student' && (!matricNumber || !school))) {
        alert("Please fill in all required fields.");
        return false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // If all validations pass
    alert("Slot is booked, and the confirmation is sent to the registered email!");

    // Clear all fields
    document.getElementById('first-name').value = "";
    document.getElementById('last-name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('user-type').value = "public";
    document.getElementById('matric-number').value = "";
    document.getElementById('school').value = "";
    document.getElementById('slot').value = "slot1";

    return false; // Prevent form submission
}

document.addEventListener("DOMContentLoaded", function () {
    // Function to get the 'title' parameter from the URL
    function getUrlParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Retrieve the title and update the text in the placeholder
    const cancerTitle = getUrlParameter('title');
    const titleElement = document.getElementById('cancer-title');

    if (cancerTitle && titleElement) {
        titleElement.textContent = decodeURIComponent(cancerTitle);
    } else {
        titleElement.textContent = "Not Specified";
    }
});

function toggleStudentFields() {
    const userType = document.getElementById('user-type').value;
    const studentFields = document.getElementById('student-fields');
    if (userType === 'student') {
        studentFields.style.display = 'block';
    } else {
        studentFields.style.display = 'none';
    }
}



