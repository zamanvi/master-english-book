export const metadata = {
  title: "Delete Account — Master English Book",
  description:
    "How to request deletion of your Master English Book / English Grammar Book in BD account and data.",
  alternates: { canonical: "https://www.masterenglishbook.com/DeleteAccount" },
  robots: "index, follow",
};

const page = () => {
  return (
    <div className="w-full mx-auto">
      <div className="px-5 md:px-8 py-6 md:py-8 max-w-3xl">
        <h1 className="font-baloo font-bold text-2xl md:text-3xl text-slate-900 mb-6">
          Delete Your Account
        </h1>

        <div className="revert-tailwind space-y-4 text-slate-700 font-hind">
          <p>
            This page applies to accounts created in the <strong>English Grammar Book in BD</strong> app
            (and other Master English Book / Red Rose Corporation apps and services).
          </p>

          <h2 className="font-baloo font-bold text-xl text-slate-900 mt-6 mb-2">
            How to request deletion
          </h2>
          <p>
            To request deletion of your account and associated data, send an email to{" "}
            <a
              href="mailto:norozzaman996@gmail.com?subject=Account%20Deletion%20Request"
              className="text-blue-600 hover:underline"
            >
              norozzaman996@gmail.com
            </a>{" "}
            from the email address registered on your account, with the subject{" "}
            <strong>&quot;Account Deletion Request&quot;</strong>. You can also reach us on WhatsApp at{" "}
            <a href="https://wa.me/+8801826192179" target="_blank" className="text-blue-600 hover:underline">
              +880 1826192179
            </a>
            .
          </p>

          <h2 className="font-baloo font-bold text-xl text-slate-900 mt-6 mb-2">
            What gets deleted
          </h2>
          <p>
            Once we verify your request, we will permanently delete your account profile, login
            credentials, and personal information (including your email address) from our systems
            within 30 days.
          </p>

          <h2 className="font-baloo font-bold text-xl text-slate-900 mt-6 mb-2">
            What may be retained
          </h2>
          <p>
            Some non-identifying or aggregated data (such as anonymized usage statistics) may be
            retained for analytics purposes. Data we are legally required to keep (e.g. for fraud
            prevention or legal compliance) will be retained only as long as required by law.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
