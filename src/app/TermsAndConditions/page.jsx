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
        <div className="px-5 md:px-8 py-6">
          <p className="text-slate-500 font-hind">Loading...</p>
        </div>
      )}
      {pageContent && (
        <div className="px-5 md:px-8 py-6 md:py-8 max-w-3xl">
          <h1 className="font-baloo font-bold text-2xl md:text-3xl text-slate-900 mb-6">{pageTitle}</h1>
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
