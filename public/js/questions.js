const conversation = [
  {
    id: "service",
    question: "👋 Hi! Welcome to Atoms AI.\n\nWhat service are you looking for?",
    type: "cards",
    options: [
      "🌐 Website Development",
      "📱 Mobile App",
      "🤖 AI Automation",
      "🎨 UI/UX Design"
    ]
  },
  {
    id: "client",
    question: "What's your name?",
    type: "text"
  },
  {
    id: "company",
    question: "Company name?",
    type: "text"
  },
 {
    id: "industry",
    question: "🏢 What industry is your company in?",
    type: "text",
    examples: "💡 Examples: Healthcare • Education • E-commerce"
},
{
    id: "goal",
    question: "🎯 What is the main goal of your project?",
    type: "text",
    examples: "💡 Examples: Increase online sales • Automate customer support • Build a company website"
},
  {
    id: "deadline",
    question: "Expected project completion time?",
    type: "cards",
    options: [
      "1 Month",
      "2-3 Months",
      "3-6 Months"
    ]
   },
  {
    id: "budget",
    question: "Select your budget.",
    type: "cards",
    options: [
      "Below ₹50,000",
      "₹50,000 - ₹1,00,000",
      "Above ₹1,00,000"
    ]
  }
];