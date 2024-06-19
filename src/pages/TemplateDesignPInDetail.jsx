import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { CiMobile4 } from "react-icons/ci";
import { RxShare2 } from "react-icons/rx";
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from "react-icons/bi";
import MainSpinner from "../component/MainSpinner";
import ShareButton from "../component/ShareButton";
import useUser from "../hooks/useUser";
import { getTemplateDetails, saveToCollection, saveToFavourite } from "../api";
import useTemplate from "../hooks/useTemplate";
import TemplateDesgin from "../component/TemplateDesgin";
import { AnimatePresence } from "framer-motion";
import { isDesktop } from "../utils/detectDevice"; // Import the utility function

const TemplateDesignPInDetail = () => {
  const { templateID } = useParams();
  const navigate = useNavigate(); // useNavigate hook from react-router-dom v6

  const { data, isError, isLoading, refetch } = useQuery(
    ["template", templateID],
    () => getTemplateDetails(templateID)
  );

  const { data: user, refetch: userRefetch } = useUser();
  const { data: template, refetch: temp_reftch, isLoading: temp_is_loading } = useTemplate();

  useEffect(() => {
    // console.log('Template ID:', templateID);
    // console.log('User data:', user);
    // console.log('Template data:', data);
  }, [templateID, user, data]);

  if (isLoading) return <MainSpinner />;
  if (isError) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <p className="text-lg font-semibold font-inter-bold">
          Error while fetching data... please try again later
        </p>
      </div>
    );
  }

  const addToCollection = async (e) => {
    e.stopPropagation();
    await saveToCollection(user, data);
    userRefetch();
  };

  const addToFavourite = async (e) => {
    e.stopPropagation();
    await saveToFavourite(user, data);
    temp_reftch();
    refetch();
  };


  const navigateToEdit = () => {
    if(templateID == "1718553790487" ){
     
      alert("👨‍💻 Developer working on this template. 🛠️ Thanks for your patience. 🙏😊");
    }else{
      navigate(`/builder/resume/${data?.name}?templateId=${templateID}`);
    }
    
  }

    // stop user to get into the page in small devices


  // const handleCustomizeClick = (e) => {
  //   if (isDesktop()) {
  //     navigate(`/builder/resume/${data?.name}?templateId=${templateID}`);
  //   } else {
  //     e.preventDefault();
  //     alert("Please use a laptop or desktop to customize this template.");
  //   }
  // };


  

  return (
    <div className="w-full px-4 py-3 flex flex-col items-center justify-center">
      <div className="w-full flex items-center pb-8 gap-2">
        <Link to="/builder" className="flex items-center justify-center gap-2 font-inter-bold text-sm">
          <IoHomeSharp />
          Home
        </Link>
        <p>/</p>
        <p>{data?.name}</p>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8 flex flex-col items-start lg:items-center justify-center gap-4">
          <img src={data?.imageURL} className="w-[602px] h-auto object-contain rounded-md" alt="" />
        </div>
        <div className="col-span-1 lg:col-span-4 flex items-start justify-start">
          <div className="flex flex-col items-start gap-2 justify-start">
            <div className="flex justify-between gap-4 items-center">
              <h3 className="font-inter-bold text-4xl">{data?.title}</h3>
              <div className="flex items-center justify-center gap-1">
                <FaHeart className="text-base text-red-500" />
                <p className="text-base">{data?.favourite?.length} likes</p>
              </div>
            </div>
            <h3 className="text-sm font-light text-gray-400">resume 21 x 29.7 cm</h3>
            <div className="flex justify-between items-center gap-2">
              {/* go to edit section */}
              {user && (
                <button
                  onClick={navigateToEdit}
                  className="px-3 py-2 bg-customizetemp hover:bg-purple-800 text-white rounded-md"
                >
                  Customize this template
                </button>
              )}
              <ShareButton />
            </div>
            <div className="flex flex-col font-inter-bold font-light text-gray-500 mt-2 justify-start">
              <div className="flex items-center justify-start gap-3">
                <IoIosColorPalette className="text-gray-400 scale-125" />
                <p>100% fully customizable</p>
              </div>
              <div className="flex items-center justify-start gap-3">
                <CiMobile4 className="text-gray-400 scale-125" />
                <p>Edit and download on the go</p>
              </div>
              <div className="flex items-center justify-start gap-3">
                <RxShare2 className="text-gray-400 scale-125" />
                <p>Share and publish anywhere</p>
              </div>
            </div>
            {user && (
              <div className="flex items-center justify-center gap-3">
                {user?.collection?.includes(data?._id) ? (
                  <div onClick={addToCollection}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
                    <BiSolidFolderPlus className="text-base" />
                    <p className="text-sm font-inter-bold whitespace-nowrap">Remove From Collection</p>
                  </div>
                ) : (
                  <div onClick={addToCollection}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
                    <BiFolderPlus className="text-base" />
                    <p className="text-sm font-inter-bold whitespace-nowrap">Add to Collection</p>
                  </div>
                )}

                {data?.favourite?.includes(user?.uid) ? (
                  <div onClick={addToFavourite}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
                    <BiSolidHeart className="text-base" />
                    <p className="text-sm font-inter-bold whitespace-nowrap">Remove From Favourite</p>
                  </div>
                ) : (
                  <div onClick={addToFavourite}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
                    <BiHeart className="text-base" />
                    <p className="text-sm font-inter-bold whitespace-nowrap">Add to Favourite</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {template?.filter((temp) => temp._id !== data?._id)?.length > 0 && (
        <div className="w-full py-8 flex lg:mt-[100px] flex-col items-start justify-start gap-4 font-inter-bold">
          <p className="text-lg font-semibold whitespace-nowrap">You might also like</p>
          <div className="grid w-full h-[80%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {template && template.length > 0 ? (
              <AnimatePresence>
                {template?.filter((temp) => temp._id !== data?._id).map((template, index) => (
                  <TemplateDesgin key={template?._id} data={template} index={index} />
                ))}
              </AnimatePresence>
            ) : (
              <div className="text-center text-gray-500">No data found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDesignPInDetail;
