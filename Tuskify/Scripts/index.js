// DOM Elements
const submitButton = document.getElementById('submit-button'); // Submit button element
const warningMessage = document.getElementById('warning'); // Warning message element
const workCheckbox = document.getElementById('work-checkbox'); // Checkbox for work/school
const workTimeContainer = document.getElementById('work-time-container-container'); // Container for work/school time
const infoContainer = document.getElementById('info-container'); // Container for additional info inputs

// Parameters
let parameters = {
  'work': false, // Flag indicating whether work/school is enabled
  'extra': false // Placeholder for future use
}

// Event Listeners
submitButton.addEventListener('click', handleButtonClick); // Listen for click on submit button
workCheckbox.addEventListener('change', handleCheckboxChange); // Listen for change in work/school checkbox
infoContainer.addEventListener('keydown', handleEnterPress); // Listen for keydown events in info container

// Functions
function handleButtonClick() {
  let userPrompt; // Initialize user prompt variable
  getValues(userPrompt); // Call function to get input values
}

function handleCheckboxChange() {
  if (this.checked) {
    showWorkTimeContainer(); // Show work/school time container if checkbox is checked
  } else {
    hideWorkTimeContainer(); // Hide work/school time container if checkbox is unchecked
  }
}

function handleEnterPress(event) {
  const target = event.target;
  if (event.key === 'Enter' && target.classList.contains('info') && target.value !== '') {
    createInput(); // Create additional input field on Enter press
  }
}

function showWorkTimeContainer() {
  workTimeContainer.style.maxHeight = workTimeContainer.scrollHeight + 'px'; // Expand work/school time container
  workTimeContainer.style.padding = '20px'; // Add padding to work/school time container
  parameters['work'] = true; // Set work/school parameter to true
}

function hideWorkTimeContainer() {
  workTimeContainer.style.maxHeight = '0'; // Collapse work/school time container
  workTimeContainer.style.padding = '0px'; // Remove padding from work/school time container
  parameters['work'] = false; // Set work/school parameter to false
}

function createInput() {
  const newInput = document.createElement('input'); // Create new input element
  newInput.type = 'text'; // Set input type to text
  newInput.className = 'info'; // Add 'info' class to input element
  newInput.placeholder = 'Enter activities:'; // Set placeholder text for input
  infoContainer.appendChild(newInput); // Append input element to info container
  newInput.focus(); // Focus on newly created input
}

function getValues(prompt) {
  let wakeTime = document.getElementById('wake-up').value; // Get wake-up time input value
  let sleepTime = document.getElementById('sleep').value; // Get sleep time input value
  let startWork;
  let endWork;
  let travelTime;
  prompt = `Make me a schedule where I wake up at ${wakeTime} and sleep at ${sleepTime}`; // Construct user prompt

  if (parameters['work']) { // If work/school is enabled
    startWork = document.getElementById('start-work').value; // Get start work time input value
    endWork = document.getElementById('end-work').value; // Get end work time input value
    travelTime = document.getElementById('travel-time').value; // Get travel time input value
    prompt += ` while keeping in mind that I need depart ${travelTime} before ${startWork} and the work ends at ${endWork} so I'll be home at ${travelTime} after ${endWork}.` // Append work/school info to prompt
  }

  const extraInfo = getExtraInfo(); // Get additional info inputs

  if (allValuesProvided(wakeTime, sleepTime, startWork, endWork, travelTime)) {
    setWarningMessage('All values are provided. Proceeding with AI prompt...', '#a6da95'); // Display success message
    sendRequest(prompt + (extraInfo.length > 0 ? ` Also include these activities in the schedule: ${extraInfo}.` : '')); // Send user prompt to AI service
    sendRequest(prompt = prompt + ' Finally, describe each sequence of hours thoroughly and explain why you chose to structure them in this manner.', true);
  } else {
    setWarningMessage('Some values are missing. Please fill in all required information.', 'red'); // Display error message
  }
}

function getExtraInfo() {
  const inputs = document.querySelectorAll('.info'); // Get all additional info inputs
  const extraInfo = [];
  inputs.forEach(input => {
    if (input.value.trim() !== '') {
      extraInfo.push(input.value); // Add non-empty input values to extra info array
    }
  });
  return extraInfo; // Return array of additional info
}

function allValuesProvided(wakeTime, sleepTime, startWork, endWork, travelTime) {
  return wakeTime !== '' && sleepTime !== '' && (!parameters['work'] || (startWork !== '' && endWork !== '' && travelTime !== '')); // Check if all required values are provided
}

function setWarningMessage(message, color) {
  warningMessage.textContent = message; // Set warning message text
  warningMessage.style.color = color; // Set warning message color
}

function sendRequest(prompt, create=false) {
  const apiKey = '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'; // API key for OpenAI
  const endpoint = 'https://api.openai.com/v1/chat/completions'; // OpenAI API endpoint

  const data = {
    model: 'gpt-3.5-turbo', // GPT-3.5 model
    max_tokens: 4000, // Max number of tokens for response
    temperature: 0.7, // Temperature parameter for response generation
    n: 1, // Number of completions to generate
    messages: [
      {"role": "user", "content": prompt} // User message content
    ]
  };

  const headers = {
    'Content-Type': 'application/json', // JSON content type
    'Authorization': `Bearer ${apiKey}` // Authorization header with API key
  };

  axios.post(endpoint, data, { headers: headers }) // Send POST request to OpenAI API
    .then(response => {
      prompt = response.data.choices[0].message.content.trim();
      if (create) {
        createSchedule(prompt, 'ai-section', 'ai-text');
      }
    })
    .catch(error => {
      console.error('Error:', error); // Log error if request fails
    });
}

function createSchedule(message, sectionId, paragraphClass) {
  // Create a new section element
  const section = document.createElement('section');

  // Set the ID attribute of the section element
  section.id = sectionId;

  // Create a new heading element
  const heading = document.createElement('h1');

  // Set the text content of the heading element
  heading.textContent = 'Your Schedule:';

  // Create a new paragraph element
  const paragraph = document.createElement('p');

  // Set the class attribute of the paragraph element
  paragraph.classList.add(paragraphClass);

  // Set the text content of the paragraph element
  paragraph.innerHTML = message.replace(/\n/g, '<br>');
  // Append the heading element to the section element
  section.appendChild(heading);

  // Append the paragraph element to the section element
  section.appendChild(paragraph);

  // Append the section element to the body of the HTML document
  document.body.appendChild(section);
}
