const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let currentQuestion = 0;
let answers = {};

function scrollBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addAIMessage(text){

    const message = document.createElement("div");

    message.className = "ai-message";

    message.innerHTML = `
        <div class="ai-header">
            <span class="ai-avatar">🤖</span>
            <strong>Proposal Agent</strong>
        </div>
        <div class="ai-text">
            ${text.replace(/\n/g,"<br>")}
        </div>
    `;

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;

}

function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "user-message";
    msg.innerHTML = text;
    chatBox.appendChild(msg);
    scrollBottom();
}

function showQuestion() {

    if (currentQuestion >= conversation.length) {
        generateProposal();
        return;
    }

    const q = conversation[currentQuestion];

   let message = q.question;

if (q.examples) {
    message += `<br><br><small style="color:#888;">${q.examples}</small>`;
}

addAIMessage(message);
    if (q.type === "cards") {
        showCards(q.options);
        userInput.style.display = "none";
        sendBtn.style.display = "none";
    }
     if (q.type === "text") {
    userInput.style.display = "block";
    sendBtn.style.display = "block";
    userInput.value = "";

    userInput.placeholder = q.placeholder || "Type your answer...";

    userInput.focus();
   }
}

function showCards(options) {

    const box = document.createElement("div");
    box.className = "card-container";

    options.forEach(option => {

        const btn = document.createElement("button");
        btn.className = "option-card";
        btn.innerText = option;

        btn.onclick = function () {

            answers[conversation[currentQuestion].id] = option;

            addUserMessage(option);

            box.remove();

            currentQuestion++;

            setTimeout(showQuestion, 700);

        };

        box.appendChild(btn);

    });

    chatBox.appendChild(box);

    scrollBottom();

}
function showTyping(){

    const typing = document.createElement("div");

    typing.className = "typing-message";

    typing.id = "typing";

    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    chatBox.appendChild(typing);

    chatBox.scrollTop = chatBox.scrollHeight;

}

function hideTyping(){

    const typing = document.getElementById("typing");

    if(typing){

        typing.remove();

    }

}
function validateAnswer(questionId, answer) {

    answer = answer.trim();

    switch(questionId){

        case "client":

            if(answer.length < 2){
                return "❌ Please enter a valid name.";
            }

            break;

        case "company":

            if(answer.length < 2){
                return "❌ Please enter a valid company name.";
            }

            break;

        case "industry":

            if(answer.length < 3){
                return "❌ Please enter a valid industry.\n\nExamples:\nHealthcare\nEducation\nFinance\nRetail\nManufacturing";
            }

            break;

        case "goal":

            if(answer.length < 10){
                return "❌ Please describe your project goal in more detail.\n\nExample:\nI want to automate customer support using AI.";
            }

            break;

    }

    return null;

}