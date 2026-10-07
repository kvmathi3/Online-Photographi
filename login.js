// ========================================
// LOGIN FORM
// ========================================

document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();


        // ========================================
        // GET FORM VALUES
        // ========================================

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        // ========================================
        // SEND LOGIN REQUEST
        // ========================================

        try {

            const response = await fetch(
                "http://localhost:5000/api/login",
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


            // ========================================
            // GET SERVER RESPONSE
            // ========================================

            const data =
                await response.json();


            document.getElementById(
                "loginMessage"
            ).innerText = data.message;


            // ========================================
            // LOGIN SUCCESS
            // ========================================

            if (response.ok) {

                // Store user information

                localStorage.setItem(
                    "userName",
                    data.user.name
                );

                localStorage.setItem(
                    "userEmail",
                    data.user.email
                );


                // Go to home page

                setTimeout(function () {

                    window.location.href =
                        "index.html";

                }, 1000);

            }


        } catch (error) {

            console.log(error);

            document.getElementById(
                "loginMessage"
            ).innerText =
                "❌ Server connection failed";

        }

    });