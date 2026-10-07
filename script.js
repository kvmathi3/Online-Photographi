// ========================================
// SNAPBOOK
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("SnapBook loaded successfully.");

});


// ========================================
// SELECT SERVICE
// ========================================

function selectService(serviceName) {

    document.getElementById("service").value = serviceName;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// SELECT PHOTOGRAPHER
// ========================================

function selectPhotographer(photographerName) {

    document.getElementById("photographer").value =
        photographerName;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// BOOKING
// ========================================

document.getElementById("bookingForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const phone =
            document.getElementById("phone").value;

        const service =
            document.getElementById("service").value;

        const photographer =
            document.getElementById("photographer").value;

        const date =
            document.getElementById("date").value;

        const time =
            document.getElementById("time").value;

        const location =
            document.getElementById("location").value;


        if (
            !name ||
            !email ||
            !phone ||
            !service ||
            !photographer ||
            !date ||
            !time ||
            !location
        ) {

            alert("Please fill all required fields.");

            return;

        }


        alert(
            "📸 Booking Confirmed Successfully!\n\n" +

            "Customer: " + name + "\n" +

            "Email: " + email + "\n" +

            "Service: " + service + "\n" +

            "Photographer: " + photographer + "\n" +

            "Date: " + date + "\n" +

            "Time: " + time
        );


        document
            .getElementById("bookingForm")
            .reset();

    });


// ========================================
// CREATE ACCOUNT
// ========================================

document.getElementById("signupForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();


        const name =
            document.getElementById("signupName")
                .value
                .trim();

        const email =
            document.getElementById("signupEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("signupPassword")
                .value;

        const message =
            document.getElementById("signupMessage");


        // Validation

        if (!name || !email || !password) {

            message.style.color = "red";

            message.innerText =
                "❌ Please fill all fields.";

            return;

        }


        try {

            // Send data to server

            const response = await fetch(
                "http://localhost:5000/api/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        email: email,

                        password: password

                    })

                }
            );


            const data = await response.json();


            // Show server message

            message.innerText = data.message;

            message.style.color =
                response.ok ? "green" : "red";


            // Account created

            if (response.ok) {

                alert(
                    "🎉 Account Created Successfully!"
                );


                // Clear signup form

                document
                    .getElementById("signupForm")
                    .reset();


                // Go to login form

                showLogin();


                // Put email automatically in login

                document.getElementById("loginEmail")
                    .value = email;


                // Scroll to login

                document.getElementById("login")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }


        } catch (error) {

            console.log("Signup Error:", error);

            message.style.color = "red";

            message.innerText =
                "❌ Server connection failed. Please start server.js.";

        }

    });


// ========================================
// LOGIN
// ========================================

document.getElementById("loginForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("loginPassword")
                .value;

        const message =
            document.getElementById("loginMessage");


        // Validation

        if (!email || !password) {

            message.style.color = "red";

            message.innerText =
                "❌ Please enter email and password.";

            return;

        }


        try {

            // Send login details to server

            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        email: email,

                        password: password

                    })

                }
            );


            const data = await response.json();


            // Show response

            message.innerText = data.message;

            message.style.color =
                response.ok ? "green" : "red";


            // Login successful

            if (response.ok) {

                alert(
                    "✅ Login Successful!\n\n" +
                    "Welcome " +
                    data.user.name +
                    " 🎉"
                );


                // Store only name and email

                localStorage.setItem(
                    "snapbookUser",
                    JSON.stringify(data.user)
                );

            }


        } catch (error) {

            console.log("Login Error:", error);

            message.style.color = "red";

            message.innerText =
                "❌ Backend connection failed. Please start server.js.";

        }

    });


// ========================================
// SHOW SIGNUP FORM
// ========================================

function showSignup() {

    event.preventDefault();

    document.querySelector(
        ".login-box:not(.signup-box)"
    ).style.display = "none";


    document.getElementById("signupBox")
        .style.display = "block";


    document.getElementById("login")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ========================================
// SHOW LOGIN FORM
// ========================================

function showLogin() {

    document.querySelector(
        ".login-box:not(.signup-box)"
    ).style.display = "block";


    document.getElementById("signupBox")
        .style.display = "none";

}