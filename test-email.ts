async function testEmail() {
  try {
    const response = await fetch("http://127.0.0.1:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        message: "This is a test message from the test script.",
        clientId: "finance-site",
      }),
    });

    const data = await response.json();
    console.log("Response Status:", response.status);
    console.log("Response Body:", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

testEmail();
