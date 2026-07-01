import getPage from "../../../lib/getPage";

export const metadata = {
  title: "Terms & Conditions — Master English Book",
  description: "Read the terms and conditions for using Master English Book by Red Rose Corporation.",
  alternates: { canonical: "https://www.masterenglishbook.com/TermsAndConditions" },
  robots: "index, follow",
};

const page = async () => {

  const pageData = await getPage("masterenglishbook", "terms-and-conditions");

  const pageContent = pageData?.success?.data?.page;
  const pageTitle = pageContent?.title;
  const pageDetails = pageContent?.description;

  return (
    <div className="w-full mx-auto">
      {!pageContent && (
        <div className="px-3 py-5">
          <p>Loading...</p>
        </div>
      )}
      {pageContent && (
        <div className="px-3 py-5">
          <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>
          <div className="revert-tailwind">
            <div
              className="revert-tailwind"
              dangerouslySetInnerHTML={{ __html: pageDetails }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
