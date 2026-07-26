async function generateProposal() {

    showTyping();

    const prompt = `
You are a senior business proposal consultant.

Create a unique and professional proposal for every client.

Client Details:
- Client Name: ${answers.client}
- Company: ${answers.company}
- Service Required: ${answers.service}
- Budget: ${answers.budget}
- Industry: ${answers.industry}
- Project Goal: ${answers.goal}
- Deadline: ${answers.deadline}

IMPORTANT:

Return ONLY a JSON object.

Do not return:

- Markdown
- Triple backticks
- Explanation
- Notes
- Intro text
- Ending text

The first character must be {

The last character must be }

Your response must be valid JSON that can be parsed using JSON.parse().

{
  "executive_summary":"",
  "scope":["","",""],
  "deliverables":["","",""],
  "timeline":[
    {"phase":"","duration":""},
    {"phase":"","duration":""},
    {"phase":"","duration":""},
    {"phase":"","duration":""}
  ],
  "estimated_cost":{
    "min":"",
    "max":""
  },
  "why_choose_us":"",
  "conclusion":""
}

Rules:
- Return JSON only.
- No markdown.
- No HTML.
- Timeline must contain exactly 4 phases.
- Estimated cost must contain only min and max values.
`;

    console.log("Answers:", answers);

    try {

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },

            body: JSON.stringify({

                model: "llama-3.3-70b-versatile",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.7

            })

        });

        const data = await response.json();

        console.log(data);

        if (data.error) {

            hideTyping();

            addAIMessage("❌ " + data.error.message);

            return;

        }

       let aiText = data.choices[0].message.content.trim();

console.log("Raw AI Response:", aiText);

// Remove markdown code blocks
aiText = aiText.replace(/```json/gi, "");
aiText = aiText.replace(/```/g, "").trim();

// Extract JSON even if AI adds extra text
const start = aiText.indexOf("{");
const end = aiText.lastIndexOf("}");

if (start === -1 || end === -1) {
    throw new Error("AI did not return valid JSON.");
}

const jsonText = aiText.substring(start, end + 1);

console.log("Extracted JSON:", jsonText);

const proposal = JSON.parse(jsonText);
        hideTyping();

        displayProposal(proposal);

    }
    catch (error) {

        console.error(error);

        hideTyping();

        addAIMessage("❌ " + error.message);

    }

}
function displayProposal(data) {

    const card = document.createElement("div");

    card.className = "proposal-card";

    card.innerHTML = `

<div class="proposal-header">

<h1>🚀 ATOMS AI SOLUTIONS</h1>

<p>Professional Software Development & AI Automation</p>

<hr>

<h2>BUSINESS PROPOSAL</h2>

<p>Prepared for <strong>${answers.company}</strong></p>

</div>

<div class="client-box">

<h2>👤 Client Information</h2>

<p><strong>Client</strong><br>${answers.client}</p>

<p><strong>Company</strong><br>${answers.company}</p>

<p><strong>Service</strong><br>${answers.service}</p>

<p><strong>Budget</strong><br>${answers.budget}</p>

</div>

<div class="proposal-section">

<h3>📌 Executive Summary</h3>

<p>${data.executive_summary}</p>

</div>

<div class="proposal-section">

<h3>🎯 Scope of Work</h3>

<ul>

${data.scope.map(item => `<li>${item}</li>`).join("")}

</ul>

</div>

<div class="proposal-section">

<h3>📦 Deliverables</h3>

<ul>

${data.deliverables.map(item => `<li>${item}</li>`).join("")}

</ul>

</div>

<div class="proposal-section">

<h3>📅 Project Timeline</h3>

<table class="timeline-table">

<tr>

<th>Phase</th>

<th>Duration</th>

</tr>

${data.timeline.map(item => `

<tr>

<td>${item.phase}</td>

<td>${item.duration}</td>

</tr>

`).join("")}

</table>

</div>

<div class="proposal-section">

<h3>💰 Estimated Cost</h3>

<div class="cost-box">

${data.estimated_cost.min} - ${data.estimated_cost.max}

</div>

</div>

<div class="proposal-section">

<h3>⭐ Why Choose Us</h3>

<p>${data.why_choose_us}</p>

</div>

<div class="proposal-section">

<h3>🎯 Conclusion</h3>

<p>${data.conclusion}</p>

</div>

<div class="footer-box">

<h3>Thank You!</h3>

<p>We appreciate the opportunity to work with your organization.</p>

<hr>

<p><strong> AI SOLUTIONS</strong></p>

<p>📧 contact@atomsai.com</p>

<p>📞 +91 XXXXX XXXXX</p>

</div>

<div class="proposal-actions">

<button onclick="downloadPDF()">📄 Download PDF</button>

<button onclick="window.print()">🖨️ Print</button>

</div>

`;

    chatBox.appendChild(card);

    chatBox.scrollTop = chatBox.scrollHeight;

}
function downloadPDF() {

    const element = document.querySelector(".proposal-card");

    if (!element) {
        alert("Proposal not found!");
        return;
    }

    if (typeof html2pdf === "undefined") {
        alert("html2pdf library not loaded!");
        return;
    }

  const options = {
    margin: [10, 10, 10, 10],

    filename: `Business_Proposal_${answers.company}.pdf`,

    image: {
        type: "jpeg",
        quality: 1
    },

    html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
    },

    jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
    },

    pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
        avoid: ['.proposal-section', '.client-box', '.timeline-table', '.footer-box']
    }
};  

    html2pdf()
        .set(options)
        .from(element)
        .save();

}
