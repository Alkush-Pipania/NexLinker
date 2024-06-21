import React, { useEffect } from 'react';
import useUser from '../hooks/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';
import useTemplate from '../hooks/useTemplate';
import { useNavigate } from 'react-router-dom';
import TemplateDesign from '../component/TemplateDesgin';


const UserProfile = () => {
  const { data: user, isLoading } = useUser();
  const { data: templates, isLoading: temp_loading, isError: temp_isError } = useTemplate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth', { replace: true });
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClimbingBoxLoader color="#69d636" size={20} />
      </div>
    );
  }

  if (!user) {
    return null; // or a suitable placeholder/component if user data is not available
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <div className="mt-11">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User Profile" className="rounded-md w-28" />
        ) : (
          <div className="w-28 h-28 rounded-md relative flex cursor-pointer items-center justify-center bg-blue-500 shadow-md">
            <p className="uppercase text-lg text-white">{user?.email[0]}</p>
          </div>
        )}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {user.displayName || 'Guest'}
        </motion.h3>
      </div>
      <div className="flex items-center justify-center mt-12">
        <h3 className="text-blue-600 bg-white px-2 py-1 rounded-lg cursor-pointer">Saved Resume</h3>
        <div>
          <AnimatePresence>
            {user?.collection && user.collection.length > 0 ? (
              <RenderTemplate templates={templates} />
            ) : (
              <div>No saved resumes</div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const RenderTemplate = ({ templates }) => {
  if (!templates || templates.length === 0) {
    return <div>No templates available</div>;
  }

  return (
    <React.Fragment>
      <AnimatePresence>
        {templates.map((template, index) => (
          <TemplateDesign 
            key={template?._id}
            data={template}
            index={index}
          />
        ))}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default UserProfile;
