
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

const Template2 = () => {
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
    Skills: `I have consistently delivered [mention specific achievements or results, e.g., "streamlined processes resulting in a 20% increase in efficiency"]. Alongside my technical proficiency, I excel in [mention soft skills like communication, problem-solving, teamwork], as evidenced by my ability to [provide an example of how you effectively used these skills, e.g., "successfully collaborate with cross-functional teams to achieve project milestones"]. 

`,
    Summary: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alia minus est culpa id corrupti nobis ullam harum, porro veniam facilis, obcaecati nulla magnam beatae quae at eos! Qui, similique laboriosam?`,
    refererName: "Sara Taylore",
    refererRole: "Director | Company Name",
    mobile: "+91 0000-0000",
    email: "urname@gmail.com",
    Linkedin: "linkedin.com/username",
    address: "your street address, ss, street, city/zip code - 1234",
  });

  const [experiences, setExperiences] = useState([
    {
      year: "2012 - 2014",
      title: "Lead buisness Analyst & project manager",
      addres: "las vagas, USA",
      companyname: "Network Solution LLC",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
    },
    {
      year: "2012 - 2014",
      title: "Job Position Here",
      addres: "las vagas, USA",
      companyname: "Network Solution LLC",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
    },
    {
      year: "2012 - 2014",
      title: "Job Position Here",
      addres: "las vagas, USA",
      companyname: "Network Solution LLC",
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
        companyname: "Network Solution LLC",
        location: "Las Vegas, USA",
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
    <div className="w-full flex flex-col items-center justify-start gap-4">
      {/* bread crump */}
      <div className="w-full flex items-center gap-2 px-4">
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
          /  /
        </p>
        <p>Edit</p>
      </div>

      <div className="w-full lg:w-[1300px] grid grid-cols-1 lg:grid-cols-12 px-6 lg:px-32">
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

            <div className=" flex items-center justify-center gap-2">
              <p className="text-sm text-txtPrimary">Download : </p>
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
            </div>
          </div>
          <div className="w-full  flex-nowrap  h-auto bg-blue-500 items-center flex flex-col justify-center  " ref={resumeRef}>
            {/* top section start */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex mt-5 ">
                <input
                  type="text"
                  readOnly="true"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  id="templatename"
                  className={`bg-transparent outline-none border-none text-center text-2xl ${isEdit && "text-white w-full"
                    }`}
                />
              </div>
              <div className="-mt-2 ">
                <input
                  value={formData.professionalTitle}
                  onChange={handleChange}
                  name="professionalTitle"
                  type="text"
                  readOnly="true"
                  className={`bg-transparent outline-none border-none text-center text-gray-600 text-sm  w-full ${isEdit && "text-white"
                    }`}
                />
              </div>
              <div className="flex items-center justify-center ">
                <input
                  value={formData.mobile}
                  onChange={handleChange}
                  name="mobile"
                  type="text"
                  readOnly="true"
                  className={`bg-transparent outline-none border-none text-xs -mr-6 text-center text-gray-200 ${isEdit && "bg-[#1c1c1c]"
                    }`}
                />
                <p className=" mr-2">•</p>
                <input
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  type="text"
                  readOnly
                  className={`bg-transparent outline-none text-start border-none text-xs -mr-14  text-gray-200 w-[170px] ${isEdit ? "bg-[#1c1c1c]" : ""}`}
                />
                <p className=" mr-2">•</p>
                <input
                  value={formData.Linkedin}
                  onChange={handleChange}
                  name="Linkedin"
                  type="text"
                  readOnly="true"
                  className={`bg-transparent outline-none text-start border-none  text-xs -mr-9 text-gray-200 w-[170px] ${isEdit && "bg-[#1c1c1c]"
                    }`}
                />
                <p className=" mr-2">•</p>
                <input
                  readOnly="true"
                  className={`bg-transparent outline-none text-start border-none  text-xs text-gray-200 w-[100px] ${isEdit ? "bg-[#1c1c1c]" : "bg-transparent"
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
              {/* top section end */}
            </div>

            {/* first secion -- summary */}
            <div className="w-full px-16 flex flex-col justify-center items-center mt-2">
              <h3>Summary</h3>
              <div className="w-full h-[1px] my-2 bg-black"></div>
              <textarea
                readOnly="true"
                className={`text-base w-full leading-5  outline-none border-none ${isEdit ? "bg-gray-200" : "bg-transparent"
                  }`}
                name="Summary"
                value={formData.Summary}
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

            {/* skills secion ---- */}
            <div className="w-full px-16 flex flex-col justify-center items-center ">
              <h3>Skills</h3>
              <div className="w-full h-[1px] my-2 bg-black"></div>
              <textarea
                readOnly="true"
                className={`text-base w-full leading-5  outline-none border-none ${isEdit ? "bg-gray-200" : "bg-transparent"
                  }`}
                name="Skills"
                value={formData.Skills}
                onChange={handleChange}
                rows="4"
                style={{
                  minHeight: "110px",
                  width: "100%",
                  height: "120px",
                  resize: "none",
                }}
              />
            </div>

            {/* experience */}
            <div className="w-full px-16 flex flex-col justify-center items-center ">
              <h3>Experience</h3>
              <div className="w-full h-[1px] my-2 bg-black"></div>
              <div className="w-full flex flex-col items-center justify-start gap-4">
                <AnimatePresence>
                  {experiences &&
                    experiences?.map((exp, i) => (
                      <motion.div
                        {...opacityINOut(i)}
                        className="w-full"
                        key={i}
                      >

                        <div className="col-span-8 w-full -mb-7 relative">
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
                          <div className="flex w-full -mb-[22px] items-start justify-between gap-[100px]">
                            <input
                              value={exp.companyname}
                              onChange={(e) => handleExpChange(i, e)}
                              name="companyname"
                              type="text"
                              readOnly="true"
                              className={` outline-none  border-none font-sans text-gray-400 tracking-wide capitalize  w-full ${isEdit ? "bg-gray-200" : "bg-transparent"
                                }`}
                            />
                            {/* addres and year */}
                            <div>
                              <input
                                value={exp.addres}
                                onChange={(e) => handleExpChange(i, e)}
                                name="addres"
                                type="text"
                                readOnly="true"
                                className={` outline-none border-none  text-xs  ${isEdit ? "bg-gray-200" : "bg-transparent"
                                  }`}
                              />
                              <input
                                value={exp.year}
                                onChange={(e) => handleExpChange(i, e)}
                                name="year"
                                type="text"
                                readOnly="true"
                                className={` outline-none border-none text-xs text-gray-400  tracking-eide uppercase   ${isEdit ? "bg-gray-200" : "bg-transparent"
                                  }`}
                              />
                            </div>


                          </div>


                          <input
                            value={exp.title}
                            onChange={(e) => handleExpChange(i, e)}
                            name="companyAndLocation"
                            type="text"
                            readOnly="true"
                            className={` outline-none border-none text-xs tracking-wide capitalize text-txtPrimary w-full ${isEdit ? "bg-gray-200" : "bg-transparent"
                              }`}
                          />

                          <textarea
                            readOnly="true"
                            className={`text-xs   text-txtPrimary tracking-wider w-full  outline-none border-none ${isEdit ? "bg-gray-200" : "bg-transparent"
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
            {/* education */}





          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;