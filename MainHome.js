document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");

    /* ===================== MODAL HANDLING ===================== */

    const modals = {
        add: document.querySelector(".popup-wrapper"),
        edit: document.getElementById("edit-popup-wrapper"),
        addEmployee: document.getElementById("add-employee-popup-wrapper"),
    };

    const buttons = {
        openModal: document.getElementById("open-modal"),
        closeModal: document.getElementById("close-modal"),
        cancelModal: document.getElementById("cancel-modal"),
        closeEditModal: document.getElementById("close-edit-modal"),
        cancelEditModal: document.getElementById("cancel-edit-modal"),
        closeAddEmployeeModal: document.getElementById("close-add-employee-modal"),
        cancelAddEmployeeModal: document.getElementById("cancel-add-employee-modal"),
    };

    // Function to Close All Modals
    function closeAllModals() {
        Object.values(modals).forEach(modal => {
            if (modal) modal.style.display = "none";
        });
        document.body.style.overflow = "";
    }

    // Function to Open a Modal (Closes others first)
    function openModal(modal) {
        closeAllModals(); // Ensure only one is open
        if (modal) {
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        } else {
            console.error("Modal element not found!");
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "";
        } else {
            console.error("Modal element not found!");
        }
    }

    // Event Listeners for Open/Close Modals
    if (buttons.openModal) buttons.openModal.addEventListener("click", () => openModal(modals.add));
    if (buttons.closeModal) buttons.closeModal.addEventListener("click", () => closeModal(modals.add));
    if (buttons.cancelModal) buttons.cancelModal.addEventListener("click", () => closeModal(modals.add));

    if (buttons.closeEditModal) buttons.closeEditModal.addEventListener("click", () => closeModal(modals.edit));
    if (buttons.cancelEditModal) buttons.cancelEditModal.addEventListener("click", () => closeModal(modals.edit));

    if (buttons.closeAddEmployeeModal) buttons.closeAddEmployeeModal.addEventListener("click", () => closeModal(modals.addEmployee));
    if (buttons.cancelAddEmployeeModal) buttons.cancelAddEmployeeModal.addEventListener("click", () => closeModal(modals.addEmployee));

    // Close modals when clicking outside
    document.addEventListener("click", function (event) {
        Object.values(modals).forEach(modal => {
            if (event.target === modal) closeModal(modal);
        });
    });

    /* ===================== EDIT FUNCTION ===================== */
    
    window.editRow = function (button) {
        console.log("Edit button clicked");

        const employeeField = document.getElementById("employee");
        const employmentDateField = document.getElementById("employment-date");

        if (employeeField) employeeField.value = button.getAttribute("data-employee") || "";
        if (employmentDateField) employmentDateField.value = button.getAttribute("data-employment-date") || "";

        openModal(modals.edit);
    };

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-btn")) {
            editRow(event.target);
        }
    });

    /* ===================== DROPDOWN HANDLING ===================== */

    const dropdownToggle = document.getElementById("dropdownToggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const chevDown = document.getElementById("ChevDown");
    const chevUp = document.getElementById("ChevUp");

    if (dropdownToggle && dropdownMenu) {
        dropdownMenu.style.display = "none"; 

        dropdownToggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const isHidden = dropdownMenu.style.display === "none" || dropdownMenu.style.display === "";
            dropdownMenu.style.display = isHidden ? "block" : "none";
            chevDown.style.display = isHidden ? "none" : "inline";
            chevUp.style.display = isHidden ? "inline" : "none";
        });

        document.addEventListener("click", function (event) {
            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none";
                chevDown.style.display = "inline";
                chevUp.style.display = "none";
            }
        });

        dropdownMenu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    /* ===================== ADD EMPLOYEE HANDLING ===================== */

    const assignedDropdown = document.getElementById("assigned");

    function checkForAddEmployee() {
        if (assignedDropdown && assignedDropdown.value === "add-employee") {
            openModal(modals.addEmployee);
            assignedDropdown.value = ""; 
        }
    }

    function checkForAddEmployeeEdit() {
        const editDropdown = document.getElementById("assigned-edit");
        if (editDropdown && editDropdown.value === "add-employee") {
            openModal(modals.addEmployee);
            editDropdown.value = "";
        }
    }

    if (assignedDropdown) assignedDropdown.addEventListener("change", checkForAddEmployee);
    document.getElementById("assigned-edit")?.addEventListener("change", checkForAddEmployeeEdit);

    /* ===================== CONDITION TOGGLE ===================== */

    const conditionDropdown = document.getElementById("condition");
    const magicalDiv = document.getElementById("magicaldiv");

    if (conditionDropdown && magicalDiv) {
        conditionDropdown.addEventListener("change", function () {
            if (this.value === "Brand New") {
                magicalDiv.classList.add("hidden");
            } else {
                magicalDiv.classList.remove("hidden");
            }
        });

        conditionDropdown.dispatchEvent(new Event("change"));
    }
});
