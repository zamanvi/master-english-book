import getPage from "../../../lib/getPage";
const page = async () => {
  /* 
    type=englishspeakingcourseinbangladesh,slug=terms-and-conditions	
    type=englishspeakingcourseinbangladesh,slug=updated-privacy-policy
  
  */

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
