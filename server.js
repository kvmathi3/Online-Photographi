const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());


// ========================================
// MONGODB CONNECTION
// ========================================

mongoose
    .connect("mongodb://127.0.0.1:27017/snapbook")
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("❌ MongoDB Connection Error:", error);
    });


// ========================================
// NODEMAILER
// ========================================

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    auth: {

        user: "kvmathi3@@gmail.com",

        pass: "ukpz sgmk zxdd tqao"

    },

    tls: {

        rejectUnauthorized: false

    }

});


// ========================================
// USER / BOOKING SCHEMA
// ========================================

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    eventType: {
        type: String,
        required: true
    },

    photographer: {
        type: String,
        required: true
    },

    eventDate: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    package: {
        type: String,
        required: true
    },

    hours: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});


const User = mongoose.model("User", userSchema);


// ========================================
// REGISTER + BOOKING API
// ========================================

app.post("/api/register", async (req, res) => {

    try {

        let {
            name,
            email,
            phone,
            password,
            eventType,
            photographer,
            eventDate,
            location,
            package: packageType,
            hours
        } = req.body;


        // ========================================
        // CLEAN EMAIL
        // ========================================

        email = email.trim().toLowerCase();


        // ========================================
        // CHECK EXISTING EMAIL
        // ========================================

        const existingUser = await User.findOne({
            email: email
        });


        if (existingUser) {

            console.log("⚠️ Existing email:", email);

            return res.status(400).json({

                success: false,

                message:
                    "❌ Email already registered. Please use another email."

            });

        }


        // ========================================
        // CREATE USER
        // ========================================

        const newUser = new User({

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

        });


        // ========================================
        // SAVE TO MONGODB
        // ========================================

        await newUser.save();


        console.log(
            "✅ User registered successfully:",
            email
        );


        // ========================================
        // EMAIL
        // ========================================

        const mailOptions = {

            from:
                "kvmathi3@gmail.com",

            to:
                email,

            subject:
                "SnapBook Photography Booking Confirmed",

            text:

                "Hello " +
                name +
                ",\n\n" +

                "Your photography booking has been created successfully.\n\n" +

                "--------- BOOKING DETAILS ---------\n\n" +

                "Name: " +
                name +
                "\n" +

                "Email: " +
                email +
                "\n" +

                "Phone: " +
                phone +
                "\n" +

                "Event: " +
                eventType +
                "\n" +

                "Photographer: " +
                photographer +
                "\n" +

                "Event Date: " +
                eventDate +
                "\n" +

                "Location: " +
                location +
                "\n" +

                "Package: " +
                packageType +
                "\n" +

                "Hours: " +
                hours +
                "\n\n" +

                "-----------------------------------\n\n" +

                "Thank you for choosing SnapBook Photography Services! ❤️\n\n" +

                "We are excited to capture your special moments.\n\n" +

                "Regards,\n" +

                "SnapBook Photography Team 📸"

        };


        // ========================================
        // SEND EMAIL
        // ========================================

        try {

            await transporter.sendMail(mailOptions);

            console.log(
                "📧 Email sent successfully to:",
                email
            );

        }

        catch (emailError) {

            console.log(
                "⚠️ Email sending failed:",
                emailError.message
            );

        }


        // ========================================
        // REGISTRATION SUCCESS
        // ========================================

        return res.status(201).json({

            success: true,

            message:
                "🎉 Registration & Booking Successful!"

        });


    }

    catch (error) {

        console.log(
            "❌ Registration Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "❌ Server error. Please try again."

        });

    }

});


// ========================================
// LOGIN API
// ========================================

app.post("/api/login", async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        const user = await User.findOne({

            name: name,

            email: email.trim().toLowerCase(),

            password: password

        });


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "❌ Name, email or password is incorrect."

            });

        }


        return res.json({

            success: true,

            message:
                "✅ Login successful!",

            user: {

                name: user.name,

                email: user.email,

                phone: user.phone

            }

        });


    }

    catch (error) {

        console.log(
            "❌ Login Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "❌ Server error"

        });

    }

});


// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {

    res.send(
        "📸 SnapBook Photography Booking Server is Running!"
    );

});


// ========================================
// START SERVER
// ========================================

app.listen(5000, () => {

    console.log(
        "🚀 SnapBook server running at http://localhost:5000"
    );

});