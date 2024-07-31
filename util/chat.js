const natural = require('natural');
const classifier = new natural.BayesClassifier();

// Train the classifier with sample intents
classifier.addDocument('give me a hint', 'hint');
classifier.addDocument('check my solution', 'check');
classifier.addDocument('start a new game', 'new_game');
classifier.train();

async function processChatMessage(message) {
  const intent = classifier.classify(message);
  
  switch (intent) {
    case 'hint':
      return "Here's a hint: Look at the 3x3 square in the top-left corner.";
    case 'check':
      return "Checking your solution... It looks correct so far!";
    case 'new_game':
      return "Starting a new game. Good luck!";
    default:
      return "I'm not sure how to help with that. You can ask for a hint, check your solution, or start a new game.";
  }
}