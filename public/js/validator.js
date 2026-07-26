function validateAnswer(questionId, answer) {

    answer = answer.trim();

    switch (questionId) {

        case "client":

            if (answer.length < 2) {
                return {
                    valid: false,
                    message: "❌ Please enter your full name."
                };
            }

            return {
                valid: true,
                value: answer
            };


        case "company":

            if (answer.length < 2) {
                return {
                    valid: false,
                    message: "❌ Please enter a valid company name."
                };
            }

            return {
                valid: true,
                value: answer
            };


        case "industry":

            const industries = {

                hospital: "Healthcare",
                clinic: "Healthcare",
                doctor: "Healthcare",

                school: "Education",
                college: "Education",
                university: "Education",

                shop: "Retail",
                store: "Retail",

                bank: "Finance",
                finance: "Finance",

                factory: "Manufacturing",
                manufacturing: "Manufacturing",

                ecommerce: "E-commerce",
                "e-commerce": "E-commerce",
                "online shopping": "E-commerce",

                "real estate": "Real Estate",
                construction: "Real Estate"

            };

            const key = answer.toLowerCase();

            if (industries[key]) {

                return {

                    valid: true,

                    value: industries[key]

                };

            }

            if (answer.length < 3) {

                return {

                    valid: false,

                    message:
                        "❌ Please enter a valid industry.\n\nExamples:\nHealthcare\nEducation\nFinance\nRetail\nManufacturing"

                };

            }

            return {

                valid: true,

                value: answer

            };


        case "goal":

            if (answer.length < 10) {

                return {

                    valid: false,

                    message:
                        "❌ Please describe your project goal.\n\nExample:\nBuild an AI chatbot to automate customer support."

                };

            }

            return {

                valid: true,

                value: answer

            };


        default:

            return {

                valid: true,

                value: answer

            };

    }

}