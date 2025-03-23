const page = () => {
  return (
    <div className="w-full mx-auto">
      <div className="px-3 py-5">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600">Last Updated: 26-03-2025</p>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to <strong>Master English Book</strong> ("we," "our," or
            "us"). Your privacy is important to us. This Privacy Policy explains
            how we collect, use, disclose, and protect your information when you
            visit{" "}
            <a
              href="https://www.masterenglishbook.com/"
              className="text-blue-500"
            >
              our Website
            </a>
            .
          </p>
          <p>
            By using our Website, you agree to the collection and use of
            information in accordance with this Privacy Policy.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Personal Information:</strong> Name, email address,
              contact details, and any other voluntarily provided information.
            </li>
            <li>
              <strong>Non-Personal Information:</strong> Browser type, IP
              address, operating system, and usage data through cookies and
              analytics tools.
            </li>
          </ul>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6">
            <li>Improve website functionality and user experience.</li>
            <li>
              Send updates, newsletters, or promotional content (if opted in).
            </li>
            <li>Respond to customer inquiries.</li>
            <li>Ensure website security and prevent fraudulent activities.</li>
          </ul>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">
            4. Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies to enhance your browsing experience. You can control
            or disable cookies through your browser settings.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">
            5. Data Sharing and Security
          </h2>
          <p>
            We do not sell, trade, or rent your personal information. However,
            we may share data with third-party services (e.g., payment
            processors, analytics tools) for operational purposes. We implement
            security measures to protect your data, but we cannot guarantee
            complete security.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">6. Your Rights</h2>
          <ul className="list-disc pl-6">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt-out of marketing emails.</li>
            <li>Disable cookies through browser settings.</li>
          </ul>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The latest
            version will always be available on our Website.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="mt-2">
            <strong>📧 Email:</strong>{" "}
            <a href="mailto:norozzaman996@gmail.com" className="text-blue-500">
              norozzaman996@gmail.com
            </a>
          </p>
          <p>
            <strong>📍 Address:</strong> 2nd Floor, Shonir-Akhra, Jatrabari,
            Dhaka
          </p>
          <p>
            <strong>📞 Phone:</strong> 01826192179
          </p>
        </section>
      </div>
    </div>
  );
};

export default page;
