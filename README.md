# Gen-AI Chatbot 🤖

A simple AI-powered chatbot built using Node.js, Express, HTML, CSS, and JavaScript.  
This project integrates with the OpenRouter API for AI responses and uses CORS for frontend-backend communication.

## 🖼 Preview

![Chatbot UI Preview](https://raw.githubusercontent.com/priyanshusinghchouhan/genai-chatbot/refs/heads/main/assets/genaiUI.png)


---

## 🚀 Features

- Chat interface built with HTML, CSS, and JavaScript
- Backend powered by Node.js + Express
- Integration with OpenRouter API for AI-generated responses
- CORS setup for smooth frontend-backend communication
- Organized code structure for easy maintenance


---

## ⚡ How It Works

1. User types a message into the chatbot UI  
2. Frontend sends the message to the backend via Fetch API  
3. Backend calls the OpenRouter API with the user's input  
4. AI-generated response is returned to the frontend and displayed in the chat window  

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **API:** OpenRouter (AI responses)
- **Other:** dotenv, cors, nodemon

---

## 🐞 Common Issues I Faced

- **CORS Errors:** Fixed using the `cors` middleware with correct origin settings  
- **404/405 Errors:** Resolved by defining correct routes in Express  
- **Unexpected token `<` in JSON:** Happened when HTML was returned instead of JSON — fixed by ensuring correct API responses  
- **Server connection issues:** Solved by ensuring frontend and backend ports were set up correctly  

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gen-ai-chatbot.git

# Install dependencies
npm install

# Install nodemon globally (if not already installed)
npm install -g nodemon

# Create .env file
OPENROUTER_API_KEY=your_openrouter_api_key

# Start the server with nodemon
nodemon index.js
```


## 📌 Usage
```
1. Start backend with `node index.js`  
2. Open `index.html` in your browser  
3. Type your message and get AI-generated responses from the OpenRouter API  
```
---

```
## 🔑 Example .env file

OPENROUTER_API_KEY=your_openrouter_api_key
```
---
```
## 📜 License

This project is licensed under the MIT License.
```
