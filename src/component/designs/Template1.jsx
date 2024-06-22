
import React, { useEffect, useRef, useState } from "react";
import MainSpinner from "../MainSpinner";
import { useQuery } from "react-query";
import useUser from "../../hooks/useUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase.config";
import { getTemplateDetailEditByUser } from "../../api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
import { isDesktop } from "../../utils/detectDevice";
import { useMediaQuery } from 'react-responsive';




import { TemplateOne } from "../../assets";
import {
  FaHouse,
  FaTrash,
  FaPenToSquare,
  FaPencil,
  FaPlus,
} from "react-icons/fa6";
import { BiSolidBookmarks } from "react-icons/bi";
import {
  BsFiletypePdf,
  BsFiletypePng,
  BsFiletypeJpg,
  BsFiletypeSvg,
} from "react-icons/bs";

import { AnimatePresence, motion } from "framer-motion";
import { FadeInOutWIthOpacity, opacityINOut } from "../../animations";

const Template1 = () => {
  const [isHovered, setIsHovered] = useState(false)
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const templateName = pathname?.split("/")?.slice(-1);
  const searchParams = new URLSearchParams(location.search);
  const loadedTemplateId = searchParams.get("templateId");
  // console.log(pathname, templateName, loadedTemplateId);

  const [isEdit, setIsEdit] = useState(false);
  const { data: user } = useUser();

  const resumeRef = useRef(null);

  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    imageURL: null,
  });

  // useEffect(() => {
  //   if (!isDesktop()) {
  //     alert("Please use a laptop or desktop to customize this template.");
  //     navigate("/"); // Redirect to home or any other appropriate page
  //   }
  // }, []);


  const [notifcationis, setNotifcationis] = useState(false);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setNotifcationis(true);
    }
  }, []);

  const handleClose = () => {
    setNotifcationis(false);
  };






  const {
    data: resumeData,
    isLoading: resume_isLoading,
    isError: resume_isError,
    refetch: refetch_resumeData,
  } = useQuery(["templateEditedByUser", user?.uid], () =>
    getTemplateDetailEditByUser(user?.uid, loadedTemplateId)
  );

  const [formData, setFormData] = useState({
    fullname: "Karen Richards",
    professionalTitle: "Professional Title",
    personalDescription: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alia minus est culpa id corrupti nobis ullam harum, porro veniam facilis, obcaecati nulla magnam beatae quae at eos! Qui, similique laboriosam?`,
    refererName: "Sara Taylore",
    refererRole: "Director | Company Name",
    mobile: "+91 0000-0000",
    email: "urname@gmail.com",
    website: "urwebsite.com",
    address: "your street address, ss, street, city/zip code - 1234",
  });

  const [experiences, setExperiences] = useState([
    {
      year: "2012 - 2014",
      title: "Job Position Here",
      companyAndLocation: "Company Name / Location here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
    },
    {
      year: "2012 - 2014",
      title: "Job Position Here",
      companyAndLocation: "Company Name / Location here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
    },
    {
      year: "2012 - 2014",
      title: "Job Position Here",
      companyAndLocation: "Company Name / Location here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
    },
  ]);

  const [skills, setSkills] = useState([
    {
      title: "skill1",
      percentage: "75",
    },
    {
      title: "skill2",
      percentage: "75",
    },
    {
      title: "skill3",
      percentage: "75",
    },
    {
      title: "skill4",
      percentage: "75",
    },
    {
      title: "skill5",
      percentage: "75",
    },
  ]);

  const [education, setEducation] = useState([
    {
      major: "ENTER YOUR MAJOR",
      university: "Name of your university / college 2005-2009",
    },
  ]);

  useEffect(() => {
    if (resumeData?.formData) {
      setFormData({ ...resumeData?.formData });
    }
    if (resumeData?.experiences) {
      setExperiences(resumeData?.experiences);
    }
    if (resumeData?.skills) {
      setSkills(resumeData?.skills);
    }
    if (resumeData?.education) {
      setEducation(resumeData?.education);
    }
    if (resumeData?.userProfilePic) {
      setImageAsset((prevAsset) => ({
        ...prevAsset,
        imageURL: resumeData?.userProfilePic,
      }));
    }
  }, [resumeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEditable = () => {
    setIsEdit(!isEdit);
    var inputs = document.querySelectorAll("input");
    var textarea = document.querySelectorAll("textarea");

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].readOnly = !inputs[i].readOnly;
    }

    for (var i = 0; i < textarea.length; i++) {
      textarea[i].readOnly = !textarea[i].readOnly;
    }
  };

  // image upload to the cloud
  const handleFileSelect = async (event) => {
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
    // console.log(event.target.files[0]);
    const file = event.target.files[0];
    if (file && isAllowed(file)) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const dataURL = event.target.result;
        // console.log("Data URL:", dataURL);

        // You can now use the dataURL as needed, e.g., to display an image.
        setImageAsset((prevAsset) => ({
          ...prevAsset,
          imageURL: dataURL,
        }));
      };

      // Read the file as a Data URL
      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid File Format");
    }
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  // delete an image
  const deleteImageObject = () => {
    setImageAsset((prevAsset) => ({
      ...prevAsset,
      imageURL: null,
    }));
  };

  // uploader finshed

  const handleExpChange = (index, e) => {
    const { name, value } = e.target;
    // Create a copy of the workExperiences array
    const updatedExperiences = [...experiences];
    // Update the specific field for the experience at the given index
    updatedExperiences[index][name] = value;
    // Update the state with the modified array
    setExperiences(updatedExperiences);
  };

  const removeExperience = (index) => {
    // Create a copy of the workExperiences array and remove the experience at the given index
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    // Update the state with the modified array
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    // Create a copy of the workExperiences array and add a new experience
    const updatedExperiences = [
      ...experiences,
      {
        year: "2012 - 2014",
        title: "Job Position Here",
        companyAndLocation: "Company Name / Location here",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
      },
    ];
    // Update the state with the modified array
    setExperiences(updatedExperiences);
  };

  const handleSkillsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = [...skills];
    updatedSkills[index][name] = value;
    setSkills(updatedSkills);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    const updatedSkills = [
      ...skills,
      {
        title: "skill1",
        percentage: "75",
      },
    ];
    setSkills(updatedSkills);
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEdu = [...education];
    updatedEdu[index][name] = value;
    setEducation(updatedEdu);
  };

  const removeEducation = (index) => {
    const updatedEdu = [...education];
    updatedEdu.splice(index, 1);
    setEducation(updatedEdu);
  };

  const addEducation = () => {
    const updatedEdu = [
      ...education,
      {
        major: "ENTER YOUR MAJOR",
        university: "Name of your university / college 2005-2009",
      },
    ];
    setEducation(updatedEdu);
  };

  const saveFormData = async () => {
    const timeStamp = serverTimestamp();
    const resume_id = `${templateName}-${user?.uid}`;
    const imageURL = await getImage();
    const _doc = {
      _id: loadedTemplateId,
      resume_id,
      formData,
      education,
      experiences,
      skills,
      timeStamp,
      userProfilePic: imageAsset.imageURL,
      imageURL,
    };
    // console.log(_doc);
    setDoc(doc(db, "users", user?.uid, "resumes", resume_id), _doc)
      .then(() => {
        toast.success(`Data Saved`);
        refetch_resumeData();
      })
      .catch((err) => {
        toast.error(`Error : ${err.message}`);
      });
  };

  const getImage = async () => {
    const element = resumeRef.current;
    element.onload = async () => {
      // Call the image capture code here
    };
    element.onerror = (error) => {
      console.error("Image loading error:", error);
    };
    if (!element) {
      console.error("Unable to capture content. The DOM element is null.");
      return;
    }
    try {
      const dataUrl = await htmlToImage.toJpeg(element);
      // console.log(dataUrl);
      return dataUrl;
    } catch (error) {
      console.error("Oops, something went wrong!", error.message);
      return null; // Return a default value or handle the error appropriately
    }
  };

  const generatePDF = async () => {
    // do this with dom element use ref 
    const element = resumeRef.current;
    if (!element) {
      toast.info("unable to capture content. The DOM element is null.");
      return;
    }
    htmlToImage.toPng(element).then((dataUrl) => {
      const a4width = 210;
      const aHeight = 297;

      var pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [a4width, aHeight],
      })
      const aspectRatio = a4width / aHeight;
      const imgwidth = a4width;
      const imgHeight = a4width / aspectRatio;
      const verticalMargin = (aHeight - imgHeight) / 2;

      pdf.addImage(dataUrl, "PNG", 0, verticalMargin, imgwidth, imgHeight);
      pdf.save("resume.pdf");
    })
      .catch((err) => {
        toast.info(`Error: ${err.message}`)
      })
  };

  const generateImage = async () => {
    const element = resumeRef.current;
    if (!element) {
      toast.info("unable to capture content. The DOM element is null.");
      return;
    }
    htmlToImage.toPng(element).then((dataUrl) => {
      const a4width = 210;
      const aHeight = 297;

      var pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [a4width, aHeight],
      })
      const aspectRatio = a4width / aHeight;
      const imgwidth = a4width;
      const imgHeight = a4width / aspectRatio;
      const verticalMargin = (aHeight - imgHeight) / 2;

      pdf.addImage(dataUrl, "PNG", 0, verticalMargin, imgwidth, imgHeight);
      pdf.save("resume.jpg");
    })
      .catch((err) => {
        toast.info(`Error: ${err.message}`)
      })

  };

  const generatePng = async () => {
    const element = resumeRef.current;
    if (!element) {
      toast.info("Unable to capture content. The DOM element is null.");
      return;
    }
    try {
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement('a');
      link.download = 'resume.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const generateSvg = async () => {
    const element = resumeRef.current;
    if (!element) {
      toast.info("Unable to capture content. The DOM element is null.");
      return;
    }
    try {
      const dataUrl = await htmlToImage.toSvg(element);
      const link = document.createElement('a');
      link.download = 'resume.svg';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (resume_isLoading) return <MainSpinner />;

  if (resume_isError) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <p className="text-lg text-txtPrimary font-semibold">
          Error While fetching the data
        </p>
      </div>
    );
  }




  return (
    <div className=" lg:ml-0 lg:w-full w-[1000px] ml-[500px] flex flex-col items-center justify-start gap-4">


      <AnimatePresence>
        {notifcationis && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed w-full h-screen top-0 left-0 right-0 bg-black flex flex-col justify-center text-white p-4 z-50"
          >
            <div className="w-full flex flex-col items-center mb-2 justify-center">
              <p>Scroll in x-y direction to put detail. And </p>
              <span>For better interface use <span className=" text-green-400">Desktop</span></span>
            </div>

            <button onClick={handleClose} className="bg-red-500 py-2 mx-10 mt-2 rounded">
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full ml-6 lg:ml-0 md:ml-0 flex items-center gap-2 px-4">
        <Link
          to={"/builder"}
          className="flex items-center justify-center gap-2 text-txtPrimary"
        >
          <FaHouse />
          Home
        </Link>
        <p
          className="text-txtPrimary cursor-pointer"
          onClick={() => navigate(-1)}
        >
          / Template1 /
        </p>
        <p>Edit</p>
      </div>

      <div className="w-full lg:w-[1200px] grid grid-cols-1 lg:grid-cols-12 px-6 lg:px-32">
        {/* template design */}
        <div className="col-span-12 px-4 py-6">
          <div className="flex items-center justify-end w-full gap-12 mb-4">
            <div
              className="flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
              onClick={toggleEditable}
            >
              {isEdit ? (
                <FaPenToSquare className="text-sm text-txtPrimary" />
              ) : (
                <FaPencil className="text-sm text-txtPrimary" />
              )}
              <p className="text-sm text-txtPrimary">Edit</p>
            </div>

            <div
              className="flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
              onClick={saveFormData}
            >
              <BiSolidBookmarks className="text-sm text-txtPrimary" />
              <p className="text-sm text-txtPrimary">Save</p>
            </div>

            <div
              onMouseEnter={() => isDesktop && setIsHovered(true)}
              onMouseLeave={() => isDesktop && setIsHovered(false)}
              className="flex items-center justify-center cursor-pointer gap-2"
            >
              <p className="text-sm text-txtPrimary">Download</p>
              {isDesktop ? (
                isHovered && (
                  <div className='absolute'>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ delay: 0.1 }}
                      className='relative flex gap-3 -top-6'
                    >
                      <BsFiletypePdf
                        className="text-2xl text-txtPrimary cursor-pointer"
                        onClick={generatePDF}
                      />
                      <BsFiletypePng
                        onClick={generatePng}
                        className="text-2xl text-txtPrimary cursor-pointer"
                      />
                      <BsFiletypeJpg
                        className="text-2xl text-txtPrimary cursor-pointer"
                        onClick={generateImage}
                      />
                      <BsFiletypeSvg
                        onClick={generateSvg}
                        className="text-2xl text-txtPrimary cursor-pointer"
                      />
                    </motion.div>
                  </div>
                )
              ) : (
                <>
                  <BsFiletypePdf
                    className="text-2xl text-txtPrimary cursor-pointer"
                    onClick={generatePDF}
                  />
                  <BsFiletypePng
                    onClick={generatePng}
                    className="text-2xl text-txtPrimary cursor-pointer"
                  />
                  <BsFiletypeJpg
                    className="text-2xl text-txtPrimary cursor-pointer"
                    onClick={generateImage}
                  />
                  <BsFiletypeSvg
                    onClick={generateSvg}
                    className="text-2xl text-txtPrimary cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full flex-nowrap  h-auto grid grid-cols-12" ref={resumeRef}>
            <div className="col-span-4 bg-black flex flex-col items-center justify-start">
              <div className="w-full h-80 bg-gray-300 flex items-center justify-center">
                {!imageAsset.imageURL ? (
                  <React.Fragment>
                    <label className=" w-full cursor-pointer h-full">
                      <div className="w-full flex flex-col items-center justify-center h-full">
                        <div className="w-full flex flex-col justify-center items-center cursor-pointer">
                          <img
                            src={TemplateOne}
                            className="w-full h-80 object-cover"
                            alt=""
                          />
                        </div>
                      </div>

                      {isEdit && (
                        <input
                          type="file"
                          className="w-0 h-0"
                          accept=".jpeg,.jpg,.png"
                          onChange={handleFileSelect}
                        />
                      )}
                    </label>
                  </React.Fragment>
                ) : (
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img
                      src={imageAsset.imageURL}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {isEdit && (
                      <div
                        className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer"
                        onClick={deleteImageObject}
                      >
                        <FaTrash className="text-sm text-white" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="w-full flex flex-col items-center justify-start pl-8 mt-4 gap-6">
                <div className="w-full">
                  <p className="uppercase text-lg font-semibold text-gray-100">
                    Education
                  </p>
                  <div className="w-full h-[2px] bg-yellow-400 mt-2"></div>
                  <AnimatePresence>
                    {education &&
                      education?.map((edu, i) => (
                        <motion.div
                          key={i}
                          {...opacityINOut(i)}
                          className="w-full pl-4 mt-3 relative"
                        >
                          <input
                            type="text"
                            readOnly="true"
                            name="major"
                            value={edu.major}
                            onChange={(e) => handleEducationChange(i, e)}
                            className={`bg-transparent outline-none border-none text-sm font-semibold uppercase  text-gray-100  ${isEdit && "text-yellow-400 w-full"
                              }`}
                          />

                          <textarea
                            readOnly="true"
                            className={`text-xs text-gray-200 mt-2  w-full  outline-none border-none ${isEdit ? "bg-[#1c1c1c]" : "bg-transparent"
                              }`}
                            name="university"
                            value={edu.university}
                            onChange={(e) => handleEducationChange(i, e)}
                            rows="2"
                            style={{
                              maxHeight: "auto",
                              minHeight: "40px",
                              resize: "none",
                            }}
                          />
                          <AnimatePresence>
                            {isEdit && (
                              <motion.div
                                {...FadeInOutWIthOpacity}
                                onClick={() => removeEducation(i)}
                                className="cursor-pointer absolute right-2 top-0"
                              >
                                <FaTrash className="text-sm text-gray-100" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {isEdit && (
                    <motion.div
                      {...FadeInOutWIthOpacity}
                      onClick={addEducation}
                      className="cursor-pointer"
                    >
                      <FaPlus className="text-base text-gray-100" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* reference */}
                <div className="w-full">
                  <p className="uppercase text-lg font-semibold text-gray-100">
                    Reference
                  </p>
                  <div className="w-full h-[2px] bg-yellow-400 mt-2"></div>
                  <div className="w-full pl-4 mt-3">
                    <input
                      value={formData.refererName}
                      onChange={handleChange}
                      name="refererName"
                      type="text"
                      readOnly="true"
                      className={`bg-transparent outline-none border-none text-base tracking-widest capitalize text-gray-100 w-full ${isEdit && "bg-[#1c1c1c]"
                        }`}
                    />

                    <input
                      value={formData.refererRole}
                      onChange={handleChange}
                      name="refererRole"
                      type="text"
                      readOnly="true"
                      className={`bg-transparent outline-none border-none text-xs capitalize text-gray-300 w-full ${isEdit && "bg-[#1c1c1c]"
                        }`}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col items-start justify-start mt-6 gap-6">
                <div className="w-full grid grid-cols-12">
                  <div className="col-span-3 w-full h-6 bg-yellow-400"></div>
                  <div className="col-span-9">
                    <div className="w-full h-6 bg-[rgba(45,45,45,0.6)] px-3 flex items-center">
                      <p className="text-sm font-semibold text-gray-200">
                        Phone
                      </p>
                    </div>
                    <input
                      value={formData.mobile}
                      onChange={handleChange}
                      name="mobile"
                      type="text"
                      readOnly="true"
                      className={`bg-transparent outline-none border-none text-xs px-3 mt-2 text-gray-200 w-full ${isEdit && "bg-[#1c1c1c]"
                        }`}
                    />
                  </div>
                </div>

                {/* email */}
                <div className="w-full grid grid-cols-12">
                  <div className="col-span-3 w-full h-6 bg-yellow-400"></div>
                  <div className="col-span-9">
                    <div className="w-full h-6 bg-[rgba(45,45,45,0.6)] px-3 flex items-center">
                      <p className="text-sm font-semibold text-gray-200">
                        Email
                      </p>
                    </div>
                    <input
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      type="text"
                      readOnly="true"
                      className={`bg-transparent outline-none border-none text-xs px-3 mt-2 text-gray-200 w-full ${isEdit && "bg-[#1c1c1c]"
                        }`}
                    />
                  </div>
                </div>

                {/* website */}
                <div className="w-full grid grid-cols-12">
                  <div className="col-span-3 w-full h-6 bg-yellow-400"></div>
                  <div className="col-span-9">
                    <div className="w-full h-6 bg-[rgba(45,45,45,0.6)] px-3 flex items-center">
                      <p className="text-sm font-semibold text-gray-200">
                        Website
                      </p>
                    </div>

                    <input
                      value={formData.website}
                      onChange={handleChange}
                      name="website"
                      type="text"
                      readOnly="true"
                      className={`bg-transparent outline-none border-none text-xs px-3 mt-2 text-gray-200 w-full ${isEdit && "bg-[#1c1c1c]"
                        }`}
                    />
                  </div>
                </div>

                {/* address */}
                <div className="w-full grid grid-cols-12">
                  <div className="col-span-3 w-full h-6 bg-yellow-400"></div>
                  <div className="col-span-9">
                    <div className="w-full h-6 bg-[rgba(45,45,45,0.6)] px-3 flex items-center">
                      <p className="text-sm font-semibold text-gray-200">
                        Address
                      </p>
                    </div>

                    <textarea
                      readOnly="true"
                      className={`text-xs text-gray-200 mt-2 px-3  w-full  outline-none border-none ${isEdit ? "bg-[#1c1c1c]" : "bg-transparent"
                        }`}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="2"
                      style={{
                        maxHeight: "auto",
                        minHeight: "40px",
                        resize: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-8 flex flex-col items-center justify-start py-6 bg-white">
              <div className="w-full py-6"></div>
              {/* title */}
              <div className="w-full px-8 py-6 bg-yellow-500">
                <div className="flex items-center justify-start ">
                  <input
                    type="text"
                    readOnly="true"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={`bg-transparent outline-none border-none text-3xl font-sans uppercase tracking-wider text-txtDark font-extrabold ${isEdit && "text-white w-full"
                      }`}
                  />
                </div>

                <input
                  value={formData.professionalTitle}
                  onChange={handleChange}
                  name="professionalTitle"
                  type="text"
                  readOnly="true"
                  className={`bg-transparent outline-none border-none text-xl tracking-widest uppercase text-txtPrimary w-full ${isEdit && "text-white"
                    }`}
                />
              </div>

              {/* about me */}
              <div className="w-full px-8 py-6 flex flex-col items-start justify-start gap-6">
                <div className="w-full">
                  <p className="uppercase text-xl tracking-wider">About Me</p>
                  <div className="w-full h-1 bg-txtDark my-3"></div>
                  <textarea
                    readOnly="true"
                    className={`text-base text-txtPrimary tracking-wider w-full  outline-none border-none ${isEdit ? "bg-gray-200" : "bg-transparent"
                      }`}
                    name="personalDescription"
                    value={formData.personalDescription}
                    onChange={handleChange}
                    rows="4"
                    style={{
                      minHeight: "100px",
                      width: "100%",
                      height: "100px",
                      resize: "none",
                    }}
                  />
                </div>

                {/* experience */}
                <div className="w-full">
                  <p className="uppercase text-xl tracking-wider">
                    Work Experience
                  </p>
                  <div className="w-full h-1 bg-txtDark my-3"></div>
                  <div className="w-full flex flex-col items-center justify-start gap-4">
                    <AnimatePresence>
                      {experiences &&
                        experiences?.map((exp, i) => (
                          <motion.div
                            {...opacityINOut(i)}
                            className="w-full grid grid-cols-12"
                            key={i}
                          >
                            <div className="col-span-4">
                              <input
                                value={exp.year}
                                onChange={(e) => handleExpChange(i, e)}
                                name="year"
                                type="text"
                                readOnly="true"
                                className={` outline-none border-none text-base tracking-eide uppercase text-txtDark w-full ${isEdit ? "bg-gray-200" : "bg-transparent"
                                  }`}
                              />
                            </div>
                            <div className="col-span-8 relative">
                              <AnimatePresence>
                                {isEdit && (
                                  <motion.div
                                    {...FadeInOutWIthOpacity}
                                    onClick={() => removeExperience(i)}
                                    className="cursor-pointer absolute right-0 top-2"
                                  >
                                    <FaTrash className="text-base text-txtPrimary" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              <input
                                value={exp.title}
                                onChange={(e) => handleExpChange(i, e)}
                                name="title"
                                type="text"
                                readOnly="true"
                                className={` outline-none border-none font-sans text-lg tracking-wide capitalize text-txtDark w-full ${isEdit ? "bg-gray-200" : "bg-transparent"
                                  }`}
                              />

                              <input
                                value={exp.companyAndLocation}
                                onChange={(e) => handleExpChange(i, e)}
                                name="companyAndLocation"
                                type="text"
                                readOnly="true"
                                className={` outline-none border-none text-sm tracking-wide capitalize text-txtPrimary w-full ${isEdit ? "bg-gray-200" : "bg-transparent"
                                  }`}
                              />

                              <textarea
                                readOnly="true"
                                className={`text-xs mt-4  text-txtPrimary tracking-wider w-full  outline-none border-none ${isEdit ? "bg-gray-200" : "bg-transparent"
                                  }`}
                                name="description"
                                value={exp.description}
                                onChange={(e) => handleExpChange(i, e)}
                                rows="3"
                                style={{
                                  maxHeight: "auto",
                                  minHeight: "60px",
                                  resize: "none",
                                }}
                              />
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                    <AnimatePresence>
                      {isEdit && (
                        <motion.div
                          {...FadeInOutWIthOpacity}
                          onClick={addExperience}
                          className="cursor-pointer"
                        >
                          <FaPlus className="text-base text-txtPrimary" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* skills */}
                <div className="w-full">
                  <p className="uppercase text-xl tracking-wider">Skills</p>
                  <div className="w-full h-1 bg-txtDark my-3"></div>
                  <div className="w-full flex flex-wrap items-center justify-start gap-4">
                    <AnimatePresence>
                      {skills &&
                        skills?.map((skill, i) => (
                          <motion.div
                            key={i}
                            {...opacityINOut(i)}
                            className="flex-1"
                            style={{ minWidth: 225 }}
                          >
                            <div className="w-full flex items-center justify-between">
                              <div className="flex items-center justify-center">
                                <input
                                  value={skill.title}
                                  onChange={(e) => handleSkillsChange(i, e)}
                                  name="title"
                                  type="text"
                                  readOnly="true"
                                  className={` outline-none border-none text-base tracking-wide capitalize font-semibold text-txtPrimary w-full ${isEdit ? "bg-gray-200" : "bg-transparent"
                                    }`}
                                />

                                <AnimatePresence>
                                  {isEdit && (
                                    <motion.input
                                      {...FadeInOutWIthOpacity}
                                      value={skill.percentage}
                                      onChange={(e) => handleSkillsChange(i, e)}
                                      name="percentage"
                                      type="text"
                                      className={` outline-none border-none text-base tracking-wide capitalize font-semibold text-txtPrimary w-full ${isEdit
                                        ? "bg-gray-200"
                                        : "bg-transparent"
                                        }`}
                                    />
                                  )}
                                </AnimatePresence>
                              </div>

                              <AnimatePresence>
                                {isEdit && (
                                  <motion.div
                                    {...FadeInOutWIthOpacity}
                                    onClick={() => removeSkill(i)}
                                    className="cursor-pointer "
                                  >
                                    <FaTrash className="text-base text-txtPrimary" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <div className="relative mt-2 w-full h-1 rounded-md bg-gray-400">
                              <div
                                className="h-full rounded-md bg-gray-600"
                                style={{
                                  width: `${skill.percentage}%`,
                                  transition: "width 0.3s ease",
                                }}
                              ></div>
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {isEdit && (
                      <div className="w-full  flex items-center justify-center py-4">
                        <motion.div
                          {...FadeInOutWIthOpacity}
                          onClick={addSkill}
                          className="cursor-pointer"
                        >
                          <FaPlus className="text-base text-txtPrimary" />
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;