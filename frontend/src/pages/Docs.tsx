import { Link } from "react-router-dom";
import { ArrowLeft, Code, Shield, Settings } from "lucide-react";

const Docs = () => {
  return (
    <div className="min-h-screen bg-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow-xl border border-stone-200 overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-stone-200">
            <h1 className="text-3xl font-bold text-stone-900">Documentation</h1>
            <p className="mt-1 max-w-2xl text-sm text-stone-500">
              Complete guide to integrating and using the Email Service.
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6 space-y-12">
            {/* Integration Section */}
            <section>
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-stone-900 mr-2" />
                <h2 className="text-2xl font-bold text-stone-900">
                  Integration Guide
                </h2>
              </div>
              <div className="prose max-w-none text-stone-500">
                <p className="mb-4">
                  Integrating our email service into your application is
                  straightforward. You can use standard HTTP requests to send
                  emails.
                </p>

                <h3 className="text-lg font-semibold text-stone-900 mt-6 mb-2">
                  1. API Endpoint
                </h3>
                <p className="mb-2">
                  Your unique API endpoint is available in the{" "}
                  <span className="font-medium text-stone-900">
                    Basic Settings
                  </span>{" "}
                  section of your dashboard.
                </p>
                <div className="bg-stone-900 text-stone-300 p-4 rounded-md font-mono text-sm mb-4 border border-stone-800">
                  POST {window.location.origin}/api/YOUR_CLIENT_ID
                </div>

                <h3 className="text-lg font-semibold text-stone-900 mt-6 mb-2">
                  2. Request Format
                </h3>
                <p className="mb-2">
                  We support both{" "}
                  <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800">
                    JSON
                  </code>{" "}
                  and{" "}
                  <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800">
                    FormData
                  </code>
                  . The request body should contain the following fields:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>
                    <code className="font-bold">name</code> (required): The name
                    of the sender.
                  </li>
                  <li>
                    <code className="font-bold">email</code> (required): The
                    email address of the sender (for reply-to).
                  </li>
                  <li>
                    <code className="font-bold">message</code> (required): The
                    content of the email.
                  </li>
                  <li>
                    <code className="font-bold">phone</code> (optional): The
                    sender's phone number.
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-stone-900 mt-6 mb-2">
                  3. Example Usage (JavaScript/Fetch)
                </h3>
                <pre className="bg-stone-900 text-stone-300 p-4 rounded-md overflow-x-auto text-sm border border-stone-800">
                  {`const sendEmail = async (data) => {
  try {
    const response = await fetch('${window.location.origin}/api/YOUR_CLIENT_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello from my website!',
      }),
    });

    if (response.ok) {
      alert('Email sent successfully!');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};`}
                </pre>

                <h3 className="text-lg font-semibold text-stone-900 mt-6 mb-2">
                  4. Example Usage (HTML Form)
                </h3>
                <pre className="bg-stone-900 text-stone-300 p-4 rounded-md overflow-x-auto text-sm border border-stone-800">
                  {`<form action="${window.location.origin}/api/YOUR_CLIENT_ID" method="POST">
  <input type="text" name="name" placeholder="Name" required>
  <input type="email" name="email" placeholder="Email" required>
  <textarea name="message" placeholder="Message" required></textarea>
  <button type="submit">Send</button>
</form>`}
                </pre>
              </div>
            </section>

            <hr className="border-stone-200" />

            {/* Configuration Section */}
            <section>
              <div className="flex items-center mb-4">
                <Settings className="h-6 w-6 text-stone-900 mr-2" />
                <h2 className="text-2xl font-bold text-stone-900">
                  Configuration & Limits
                </h2>
              </div>
              <div className="prose max-w-none text-stone-500">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-semibold text-stone-900">
                      Rate Limiting:
                    </span>{" "}
                    To prevent abuse, we limit the number of emails you can
                    receive to 5 per hour per IP address.
                  </li>
                  <li>
                    <span className="font-semibold text-stone-900">
                      Target Email:
                    </span>{" "}
                    All emails sent to your endpoint will be forwarded to the
                    email address you registered with.
                  </li>
                  <li>
                    <span className="font-semibold text-stone-900">
                      Security:
                    </span>{" "}
                    Your Client ID is unique to you. Do not share it unless you
                    want others to be able to send emails to you.
                  </li>
                </ul>
              </div>
            </section>

            <hr className="border-stone-200" />

            {/* Troubleshooting Section */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-stone-900 mr-2" />
                <h2 className="text-2xl font-bold text-stone-900">
                  Troubleshooting
                </h2>
              </div>
              <div className="prose max-w-none text-stone-500">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-stone-900">
                      Error: Method Not Allowed
                    </h4>
                    <p>
                      Ensure you are sending a{" "}
                      <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800">
                        POST
                      </code>{" "}
                      request. GET requests (visiting the URL in a browser) are
                      not supported for sending emails.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">
                      Error: Invalid Client ID
                    </h4>
                    <p>
                      Double-check that your URL matches the one displayed in
                      your dashboard exactly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">
                      Emails not arriving?
                    </h4>
                    <p>
                      Check your spam folder. Ensure your target email address
                      is correct in your account settings.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
