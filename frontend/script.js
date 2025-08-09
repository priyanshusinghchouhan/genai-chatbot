const inputForm = document.getElementById("input-Form");
const messageInput = document.getElementById("message-Input");
const chatMessages = document.querySelector(".chat-messages");

function scrollLatestMessageIntoView() {
   
    requestAnimationFrame(() => {
        const lastMessage = chatMessages.lastElementChild;
        if (lastMessage && typeof lastMessage.scrollIntoView === 'function') {
            lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        } else {
            chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
        }
    });
}

function scrollWindowToBottomSmooth() {
    
    requestAnimationFrame(() => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });
}

function scrollWindowToBottomImmediate() {
   
    requestAnimationFrame(() => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'auto'
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    scrollWindowToBottomImmediate();
});


window.addEventListener('load', () => {
    scrollWindowToBottomImmediate();
});


messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); 
        inputForm.dispatchEvent(new Event("submit")); 
    }
});

inputForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const inputvalues = messageInput.value.trim();
    
    if(!inputvalues) return;

    console.log(inputvalues);

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    console.log(time);

    let userMessageBlock = document.createElement("div");
    userMessageBlock.className = "message-user";
    userMessageBlock.innerHTML = `
       <div class="message-avatar">You</div>
       <div class="message-content">
            <div class="message-bubble">${inputvalues}</div>
            <div class="message-time">${time}</div>    
       </div>
    `
    chatMessages.appendChild(userMessageBlock);
    scrollLatestMessageIntoView();

    let aiLoading = document.createElement("div");
    aiLoading.className = "message-assistant";
    aiLoading.innerHTML = `
       <div class="message-avatar">AI</div>
       <div class="message-content">
            <div class="message-bubble">
                <div class="loading-dots-alt">
                    <div class="loading-dot-alt"></div>
                    <div class="loading-dot-alt"></div>
                    <div class="loading-dot-alt"></div>
                </div>
            </div>
            <div class="message-time">${time}</div>    
       </div>
    `
    chatMessages.appendChild(aiLoading);
    scrollLatestMessageIntoView();

    
    setTimeout(() =>{
        fetch("http://localhost:5000/chat",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {userMessage: inputvalues} )
        })
        .then(response => response.json())
        .then(data => {
             aiLoading.innerHTML = `
                <div class="message-avatar">AI</div>
                <div class="message-content">
                        <div class="message-bubble">${data.reply}</div>
                        <div class="message-time">${time}</div>    
                </div>
        `
        scrollLatestMessageIntoView();
        setTimeout(scrollWindowToBottomSmooth, 50);
        })
        .catch(err => {
            aiLoading.innerHTML = `
                <div class="message-avatar">AI</div>
                <div class="message-content">
                    <div class="message-bubble">AI failed to respond</div>
                    <div class="message-time">${time}</div>    
                </div>
            `
            scrollLatestMessageIntoView();
            setTimeout(scrollWindowToBottomSmooth, 50);
        })
        
    },2000)

    inputForm.reset()
})