// advice array to take code from local storage
let adviceArray = JSON.parse(localStorage.getItem('adviceArray')) || [
    "Take it one step at a time.",
    "Be kind to yourself.",
    "Don’t be afraid to ask for help.",
    "Remember to take breaks.",
    "Stay positive and keep pushing forward.",
    "Believe in yourself.",
    "Stay curious and keep learning.",
    "Embrace change and adapt.",
    "Take care of your body and mind.",
    "Find joy in the little things.",
    "Listen more than you speak.",
    "Practice gratitude daily.",
    "Set clear goals and work towards them.",
    "Learn from your mistakes.",
    "Surround yourself with positive influences.",
    "Manage your time wisely.",
    "Stay humble and grounded.",
    "Forgive yourself and others.",
    "Don’t compare yourself to others.",
    "Focus on what you can control.",
    "Take responsibility for your actions.",
    "Be honest with yourself and others.",
    "Maintain a balance between work and life.",
    "Prioritize your health.",
    "Invest in your relationships.",
    "Be patient with yourself.",
    "Stay open-minded and flexible.",
    "Keep your promises.",
    "Be consistent in your efforts.",
    "Seek knowledge and wisdom.",
    "Help others whenever you can.",
    "Don’t be afraid to say no.",
    "Trust your instincts.",
    "Learn to let go of what you cannot change.",
    "Stay organized and plan ahead.",
    "Don’t be afraid to take risks.",
    "Communicate clearly and effectively.",
    "Be mindful of your thoughts and actions.",
    "Find time for hobbies and passions.",
    "Take care of your financial health.",
    "Surround yourself with people who uplift you.",
    "Practice self-discipline.",
    "Keep a positive attitude.",
    "Appreciate the present moment.",
    "Learn to manage stress effectively.",
    "Don’t dwell on the past.",
    "Be a lifelong learner.",
    "Make time for rest and relaxation.",
    "Stay true to your values.",
    "Keep a journal to reflect on your experiences.",
    "Value your time and use it wisely.",
    "Be proactive rather than reactive.",
    "Seek feedback and use it to grow.",
    "Don’t let fear hold you back.",
    "Celebrate your achievements, big or small.",
    "Keep an open mind to new opportunities.",
    "Practice empathy and understanding.",
    "Set boundaries and respect them.",
    "Be resilient in the face of challenges.",
    "Always be willing to learn and grow.",
    "Take care of your mental health.",
    "Believe that you are capable of great things.",
    "Don’t be afraid to start over.",
    "Learn to live within your means.",
    "Be aware of your strengths and weaknesses.",
    "Take pride in your work.",
    "Learn to forgive and move on.",
    "Don’t take yourself too seriously.",
    "Enjoy the journey, not just the destination.",
    "Give yourself permission to be happy.",
    "Remember that progress is better than perfection.",
    "Take time to appreciate the beauty around you."

];

// update localStorage
function updateLocalStorage() {
    localStorage.setItem('adviceArray', JSON.stringify(adviceArray));
}

//generating random advice from API or local storage
document.getElementById('generateBtn').addEventListener('click', function() {
    // Fetch advice from the API
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            const apiAdvice = data.slip.advice;

            // Add the fetched advice to the adviceArray if not already present
            if (!adviceArray.includes(apiAdvice)) {
                adviceArray.push(apiAdvice);
                updateLocalStorage();
            }

            // Display the fetched advice
            document.getElementById('advice').textContent = apiAdvice;
        })
        .catch(() => {
            // Fallback to local advice array if API fails
            const randomAdvice = adviceArray[Math.floor(Math.random() * adviceArray.length)];
            document.getElementById('advice').textContent = randomAdvice;
        });
});

// new quote
document.getElementById('addQuoteBtn').addEventListener('click', function() {
    const newQuote = document.getElementById('quoteInput').value;
    if (newQuote) {
        adviceArray.push(newQuote);
        updateLocalStorage();
        alert('Quote added successfully!');
        document.getElementById('quoteInput').value = ''; // Clear the input field
    } else {
        alert('Please enter a quote.');
    }
});

// updating quote
document.getElementById('updateQuoteBtn').addEventListener('click', function() {
    const updatedQuote = document.getElementById('quoteInput').value;
    const currentAdvice = document.getElementById('advice').textContent;
    const index = adviceArray.indexOf(currentAdvice);
    
    if (index !== -1 && updatedQuote) {
        adviceArray[index] = updatedQuote;
        updateLocalStorage();
        alert('Quote updated successfully!');
        document.getElementById('advice').textContent = updatedQuote;
        document.getElementById('quoteInput').value = ''; // Clear input
    } else {
        alert('Please enter a quote or select a quote to update.');
    }
});

// removing quotes
document.getElementById('removeQuoteBtn').addEventListener('click', function() {
    const currentAdvice = document.getElementById('advice').textContent;
    const index = adviceArray.indexOf(currentAdvice);
    
    if (index !== -1) {
        adviceArray.splice(index, 1);
        updateLocalStorage();
        alert('Quote removed successfully!');
        document.getElementById('advice').textContent = "Click the button to get advice!";
    } else {
        alert('No quote to remove.');
    }
});
