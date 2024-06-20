import { arrayRemove, arrayUnion, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.config";
import { collection, query, orderBy } from "firebase/firestore";
import { toast } from 'react-toastify';


export const getUserDetail = () => {
  return new Promise((resolve, reject) => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (userCred) => {
      if (userCred) {
        const userData = userCred.providerData[0];
        const userDocRef = doc(db, "users", userData?.uid);

        const unsubscribeDoc = onSnapshot(userDocRef, async (_doc) => {
          if (_doc.exists()) {
            resolve(_doc.data());
          } else {
            try {
              await setDoc(userDocRef, userData);
              resolve(userData);
            } catch (error) {
              reject(error);
            }
          }
        });

        // Unsubscribe from the Firestore snapshot listener when no longer needed
        return () => unsubscribeDoc();
      } else {
        reject(new Error("User is not authenticated"));
      }
    });

    // Unsubscribe from the Firebase Auth listener when no longer needed
    return () => unsubscribeAuth();
  });
};


export const getTemplates = () =>{
  return new Promise((resolve,reject)=>{
    const templateRef = query(collection(db,"templates"),
   orderBy("timestamp","asc")
  );
  const unsubscribe = onSnapshot(templateRef,(querySnap)=>{
    const templates = querySnap.docs.map((doc)=> doc.data());
    resolve(templates); 
  })
  })
  return unsubscribe;
}

export const saveToCollection = async (user, data) => {
  try {
    const docRef = doc(db, "users", user?.uid);

    if (!user?.collection?.includes(data?._id)) {
      await updateDoc(docRef, {
        collection: arrayUnion(data?._id)
      });
      toast.success("Saved to Collection");
    } else {
      await updateDoc(docRef, {
        collection: arrayRemove(data?._id)
      });
      toast.dark("Removed from Collection");
    }
  } catch (err) {
    toast.error(`${err.message}`);
  }
};


export const saveToFavourite = async (user, data) => {
  
    if (!data?.favourite?.includes(user?.uid)) {
      const docRef = doc(db, "templates", data?._id);
      await updateDoc(docRef, {
        favourite: arrayUnion(user?.uid)
      })
        .then(()=> toast.success("Liked"))
        .catch((err)=> toast.error(`Error: ${err.message}`))
    } else {
      const docRef = doc(db, "templates", data?._id);
      await updateDoc(docRef, {
        favourite: arrayRemove(user?.uid)
      })
      .then(()=> toast.dark("UnLIked"))
      .catch((err)=> toast.error(`Error: ${err.message}`))
    }
 
};

export const getTemplateDetails = async (templateId) => {
  return new Promise((resolve, reject) => {
    if (!templateId) {
      return reject(new Error("Template ID is undefined"));
    }

    const docRef = doc(db, "templates", templateId);
    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          resolve(doc.data());
        } else {
          reject(new Error("Document does not exist"));
        }
      },
      (error) => {
        reject(error);
      }
    );

    // Return the unsubscribe function to ensure it's called correctly
    return () => unsubscribe();
  });
}

export const getTemplateDetailEditByUser = (uid, resumeId) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      doc(db, "users", uid, "resumes", resumeId),
      (doc) => {
        resolve(doc.data());
      }
    );

    return unsubscribe;
  });
};