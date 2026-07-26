window.onload = function () {
    showQuestion();
};


sendBtn.onclick = function () {

    const text = userInput.value.trim();

    if (text === "") return;

    const questionId = conversation[currentQuestion].id;

    // Client Name Validation
    if (questionId === "client" && text.length < 2) {
        addAIMessage("❌ Please enter your full name.");
        return;
    }

    // Company Validation
    if (questionId === "company" && text.length < 2) {
        addAIMessage("❌ Please enter a valid company name.");
        return;
    }

    // Industry Validation
    if (questionId === "industry" && text.length < 3) {
        addAIMessage("❌ Please enter a valid industry.\n\nExamples:\n• Healthcare\n• Education\n• Finance\n• Retail\n• Manufacturing");
        return;
    }

    // Goal Validation
    if (questionId === "goal" && text.length < 10) {
        addAIMessage("❌ Please describe your project goal in more detail.\n\nExample:\nBuild an AI chatbot for customer support.");
        return;
    }

    addUserMessage(text);

    answers[questionId] = text;

    userInput.value = "";

    currentQuestion++;

    setTimeout(showQuestion, 700);

};
userInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        sendBtn.click();
    }

});