
import React, { useEffect, useState } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { storage } from '../config/firebase.config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { adminIds, initialTags } from '../utils/helpers';
import { deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import useTemplate from '../hooks/useTemplate';
import { setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import useUser from '../hooks/useUser';
import { useNavigate } from "react-router-dom";



const Template = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
  
const navigate = useNavigate();
  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    uri: null,
    progress: 0,
  });

  // --------------------------------------------------------------------------------------------------------------------

  const [selectedTags, setSelectedTags] = useState([]);
  const { data: templates = [], isError: templateIsError, isLoading: templateIsLoading, refetch: templateRefetch } = useTemplate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({ ...prevRec, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));

    if (file && isAllowed(file)) {
      const storageRef = ref(storage, `Template/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapShot) => {
        setImageAsset((prevAsset) => ({ ...prevAsset, progress: (snapShot.bytesTransferred / snapShot.totalBytes) * 100 }));
      }, (error) => {
        if (error.message.includes("storage/unauthorized")) {
          toast.error("Unauthorized revoked");
        } else {
          toast.error(`Error: ${error.message}`);
        }
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            uri: downloadURL,
          }));
        });
        toast.success("Image uploaded successfully");
        setTimeout(() => {
          setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: false }));
        }, 2000);
      });
    } else {
      toast.info("Invalid file type");
    }
  };

  const deleteImageObject = () => {
    setImageAsset((prevAsset) => ({
      ...prevAsset,
      isImageLoading: true,
    }));

    const timeoutId = setTimeout(() => {
      setImageAsset((prevAsset) => ({
        ...prevAsset,
        progress: 0,
        uri: null,
      }));
    }, 2000);

    const deleteRef = ref(storage, imageAsset.uri);

    deleteObject(deleteRef)
      .then(() => {
        clearTimeout(timeoutId);
        setImageAsset((prevAsset) => ({
          ...prevAsset,
          isImageLoading: false,
          uri: null,
        }));
        toast.success("Image removed");
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        setImageAsset((prevAsset) => ({
          ...prevAsset,
          isImageLoading: false,
        }));
        toast.error("Failed to remove image: " + error.message);
      });
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleSelectionTags = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(selected => selected !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const pushToCloud = async () => {
    const timestamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      title: formData.title,
      imageURL: imageAsset.uri,
      tags: selectedTags,
      name: templates.length > 0 ? `Template${templates.length + 1}` : "Template1",
      timestamp: timestamp,
    };
    await setDoc(doc(db,"templates",id),_doc).then(() =>{
      setFormData((prevData) => ({...prevData,title:"",image:""}))
      setImageAsset((prevAsset) => ({...prevAsset,uri:null}))
      setSelectedTags([])
      templateRefetch()
      toast.success("Template pushed to cloud")
    }).catch(error =>{toast.error(`Error message : ${error.message}`)})
  };

  // if (templateIsLoading) return <p>Loading...</p>;
  if (templateIsError) return <p>Error: {templateIsError.message}</p>;

  // to remoke the template made by the admin ------------------------------
  const deletetemplate = async (template) =>{
    const deleteRef = ref(storage, template?.imageURL)
    await deleteObject(deleteRef).then(async() =>{
      await deleteDoc(doc(db,"templates",template?._id)).then(()=>{
        toast.success("Template deleted successfully")
        templateRefetch()
      }).catch(err => {
        toast.error(`Error message : ${err.message}`)
      })
    })
  }
  const {data: user,isLoading} = useUser()
  useEffect(()=>{
    if(!isLoading && !adminIds.includes(user?.uid)){
      navigate("/builder",{replace:true})
      toast.error("You are not authorized to access this page admine se baat kr")
    }
  },[user,isLoading])

  return (
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex-1 flex items-center justify-start flex-col gap-4 px-2">
        <p className="text-lg">Create a new Template</p>
        <div className="w-full flex items-center justify-end">
          <p className="text-base uppercase font-semibold">TempID: {""}</p>
          <p className="text-base capitalize font-bold">{templates.length > 0 ? `Template${templates.length + 1}` : "Template1"}</p>
        </div>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-md bg-transparent border border-x-gray-300 text-lg text-txtPrimary focus-within:text-txtDark focus:shadow-md outline-none"
          name="title"
          placeholder="template title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <div className="w-full bg-gray-100 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center">
          {imageAsset.isImageLoading ? (
            <>
              <div className="flex flex-col items-center justify-center gap-4">
                <PuffLoader color="#498FCD" size={40} />
              </div>
              <p>{imageAsset?.progress.toFixed(2)}%</p>
            </>
          ) : (
            <>
              {!imageAsset?.uri ? (
                <label className="w-full cursor-pointer h-full">
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="flex items-center justify-center cursor-pointer flex-col gap-4">
                      <FaUpload className="text-2xl" />
                      <p className="text-lg text-txtLight">Click to upload</p>
                    </div>
                  </div>
                  <input type="file" className="w-0 h-0" accept=".jpeg,.jpg,.png" onChange={handleFileSelect} />
                </label>
              ) : (
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <img src={imageAsset?.uri} loading="lazy" alt="" />
                  <div className="absolute rounded-md flex top-4 right-4 w-8 h-8 items-center float-start justify-center bg-red-500 cursor-pointer" onClick={deleteImageObject}>
                    <FaTrash className="text-sm text-white" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-full flex items-center flex-wrap gap-2">
          {initialTags.map((tag, i) => (
            <div
              key={i}
              className={`border border-gray-300 px-2 py-1 rounded-md cursor-pointer ${selectedTags.includes(tag) ? "bg-blue-500 text-white" : ""}`}
              onClick={() => handleSelectionTags(tag)}
            >
              <p className="text-xs">{tag}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="w-full bg-blue-700 text-white rounded-md py-3"
          onClick={pushToCloud}
        >Push to Cloud</button>
      </div>

      {/* right vala */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 w-full flex-1 py-4">
        {/* Additional content for the right side */}
          {templateIsLoading ? (
          <React.Fragment>
            <div className="w-full h-full flex items-center justify-center">
              <PuffLoader color="#498FCD" size={40} />
            </div>
          </React.Fragment>): (<React.Fragment>
            {templates && templates.length > 0 ? (


              // template


            <React.Fragment>
              <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
              {templates?.map(template =>(
                <div key={template._id} className="w-full h-[500px] rounded-md overflow-hidden relative">
                  <img src={template?.imageURL} alt="" className="h-full w-full object-cover" />
                  <div className="absolute rounded-md flex top-4 right-4 w-8 h-8 items-center float-start justify-center bg-red-500 cursor-pointer" onClick={() => deletetemplate(template)}>
                    <FaTrash className="text-sm text-white" />
                  </div>
                </div>
              ))}
              </div>
            </React.Fragment>):(
            <React.Fragment>
              <div className="w-full h-full flex items-center justify-center">
              <PuffLoader color="#498FCD" size={40} />
              <p className=' text-xl tracking-wide'>NO DATA</p>
            </div>
            </React.Fragment>)}
          </React.Fragment>)}
      </div>
    </div>
  );
};

export default Template;
