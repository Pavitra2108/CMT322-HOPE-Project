//event details tab
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-pane");

    // On initial load, ensure inactive tabs are hidden
    tabs.forEach((tab) => {
      if (!tab.classList.contains("active")) {
        tab.classList.remove("show");
      }
    });

    // Listen for tab changes
    document.querySelectorAll('[data-bs-toggle="pill"]').forEach((tabButton) => {
      tabButton.addEventListener("shown.bs.tab", (e) => {
        tabs.forEach((tab) => {
          if (!tab.classList.contains("active")) {
            tab.classList.remove("show"); // Remove `show` from inactive tabs
          }
        });
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const participantType = document.getElementById("participantType");
    const studentFields = document.getElementById("studentFields");
    const publicFields = document.getElementById("publicFields");
    const matricNoInput = document.getElementById("matricNo");
    const schoolInput = document.getElementById("school");
    const idCardInput = document.getElementById("idCard");
    const eventSelect = document.getElementById("event");
    const receiptInput = document.getElementById("receipt");
    const feeSection = document.getElementById("eventFee");
    const feeAmount = document.getElementById("feeAmount");
    const submitButton = document.getElementById("submitButton");
    const form = document.getElementById("eventForm");
  
    // Check form validity on input change
    function checkFormValidity() {
      const nameValid = document.getElementById("name").value.trim() !== "";
      const participantTypeValid = participantType.value !== "";
      const eventValid = eventSelect.value !== "";
      const receiptValid = validateFile(receiptInput);
  
      let additionalFieldsValid = false;
      if (participantType.value === "student") {
        additionalFieldsValid =
          matricNoInput.value.trim() !== "" && schoolInput.value.trim() !== "";
      } else if (participantType.value === "public") {
        additionalFieldsValid = idCardInput.value.trim() !== "";
      }
  
      if (
        nameValid &&
        participantTypeValid &&
        eventValid &&
        receiptValid &&
        additionalFieldsValid
      ) {
        submitButton.removeAttribute("disabled");
      } else {
        submitButton.setAttribute("disabled", "disabled");
      }
    }
  
    // Validate file type
    function validateFile(input) {
      if (input.files.length === 0) return false;
  
      const file = input.files[0];
      const allowedExtensions = ["png", "jpg", "jpeg", "pdf"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
  
      return allowedExtensions.includes(fileExtension);
    }
  
    // Update visibility and requirements for fields based on participant type
    participantType.addEventListener("change", () => {
      if (participantType.value === "student") {
        studentFields.style.display = "block";
        publicFields.style.display = "none";
        matricNoInput.setAttribute("required", "required");
        schoolInput.setAttribute("required", "required");
        idCardInput.removeAttribute("required");
        idCardInput.value = ""; // Clear ID Card when hidden
      } else if (participantType.value === "public") {
        studentFields.style.display = "none";
        publicFields.style.display = "block";
        matricNoInput.removeAttribute("required");
        schoolInput.removeAttribute("required");
        matricNoInput.value = ""; // Clear Matric No when hidden
        schoolInput.value = ""; // Clear School when hidden
        idCardInput.setAttribute("required", "required");
      } else {
        studentFields.style.display = "none";
        publicFields.style.display = "none";
        matricNoInput.removeAttribute("required");
        schoolInput.removeAttribute("required");
        idCardInput.removeAttribute("required");
      }
      checkFormValidity();
    });
  
    // Update Fee and display QR Code based on selected event
    eventSelect.addEventListener("change", () => {
      switch (eventSelect.value) {
        case "online-talk":
          feeSection.style.display = "block";
          feeAmount.textContent = "RM 2";
          break;
        case "movie-night":
          feeSection.style.display = "block";
          feeAmount.textContent = "RM 3";
          break;
        case "blood-donation":
          feeSection.style.display = "block";
          feeAmount.textContent = "Free";
          break;
        case "kite-flying":
          feeSection.style.display = "block";
          feeAmount.textContent = "RM 5";
          break;
        default:
          feeSection.style.display = "none";
          feeAmount.textContent = "";
      }
      checkFormValidity();
    });
  
    // Validate the file input on change
    receiptInput.addEventListener("change", () => {
      if (!validateFile(receiptInput)) {
        alert("Please upload a valid file (PNG, JPG, or PDF only).");
        receiptInput.value = ""; // Clear the input if invalid
      }
      checkFormValidity();
    });
  
    // Attach event listeners to all inputs for validation
    document.querySelectorAll("input, select").forEach((input) => {
      input.addEventListener("input", checkFormValidity);
      input.addEventListener("change", checkFormValidity);
    });
  
    // Initialize form validation state
    checkFormValidity();
  
    // Prevent form submission if validation fails
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        alert("Please fill out all required fields correctly.");
      }
    });
  });

  //back to Top button
  document.addEventListener("DOMContentLoaded", () => {
    const backToTopButton = document.getElementById("backToTop");
  
    // Show or hide the button when scrolling
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) { // Show the button after scrolling down 200px
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    });
  
    // Smooth scroll to top when the button is clicked
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });