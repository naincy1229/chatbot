async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Display user message
  chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
  input.value = "";

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userMessage }),
    });

    const data = await res.json();

    if (data.response) {
      chatBox.innerHTML += `<p><strong>Gemini:</strong> ${data.response}</p>`;
    } else {
      chatBox.innerHTML += `<p><em>Error: ${data.error}</em></p>`;
    }
  } catch (err) {
    chatBox.innerHTML += `<p><em>Error sending message.</em></p>`;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
document.getElementById("user-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent newline or form submission
    sendMessage(); // call your message sending function
  }
});
