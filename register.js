// ========================================
// AUTO SELECT EVENT / PHOTOGRAPHER
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const selectedEvent =
        localStorage.getItem("selectedEvent");

    const selectedPhotographer =
        localStorage.getItem("selectedPhotographer");


    // Select Event automatically
    if (selectedEvent) {

        document.getElementById("eventType").value =
            selectedEvent;

    }


    // Select Photographer automatically
    if (selectedPhotographer) {

        document.getElementById("photographer").value =
            selectedPhotographer;

    }

});


// ========================================
// REGISTER FORM
// ========================================

const registerForm =
    document.getElementById("registerForm");

const message =
    document.getElementById("message");


registerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ========================================
        // PREVENT DOUBLE SUBMIT
        // ========================================

        if (registerForm.dataset.submitting === "true") {
            return;
        }

        registerForm.dataset.submitting = "true";


        // ========================================
        // GET SUBMIT BUTTON
        // ========================================

        const submitButton =
            registerForm.querySelector(
                'button[type="submit"]'
            );


        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerText = "Registering...";
        }


        // ========================================
        // CLEAR OLD MESSAGE
        // ========================================

        message.innerText = "";


        // ========================================
        // GET FORM VALUES
        // ========================================

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("password").value;

        const eventType =
            document.getElementById("eventType").value;

        const photographer =
            document.getElementById("photographer").value;

        const eventDate =
            document.getElementById("eventDate").value;

        const location =
            document.getElementById("location").value.trim();

        const packageType =
            document.getElementById("package").value;

        const hours =
            document.getElementById("hours").value;


        // ========================================
        // SEND DATA TO SERVER
        // ========================================

        try {

            const response = await fetch(
                "http://localhost:5000/api/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,
                        email: email,
                        phone: phone,
                        password: password,
                        eventType: eventType,
                        photographer: photographer,
                        eventDate: eventDate,
                        location: location,
                        package: packageType,
                        hours: hours

                    })
                }
            );


            // ========================================
            // SERVER RESPONSE
            // ========================================

            const data =
                await response.json();


            // ========================================
            // SHOW ONLY SERVER MESSAGE
            // ========================================

            message.innerText =
                data.message;


            // ========================================
            // SUCCESS
            // ========================================

            if (response.ok) {

                registerForm.reset();


                // Remove previous selections

                localStorage.removeItem(
                    "selectedEvent"
                );

                localStorage.removeItem(
                    "selectedPhotographer"
                );

            }


        } catch (error) {

            console.log(error);

            message.innerText =
                "❌ Server connection failed";

        }


        // ========================================
        // ENABLE FORM AGAIN
        // ========================================

        registerForm.dataset.submitting = "false";


        if (submitButton) {

            submitButton.disabled = false;

            submitButton.innerText =
                "Register";

        }

    }
);