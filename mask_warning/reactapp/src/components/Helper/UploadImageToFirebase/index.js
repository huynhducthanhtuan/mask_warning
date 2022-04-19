import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../helpers/firebaseConfig/firebase";

export const UploadImageToFirebase = (image, setProgress, setUrlImage) => {
  if (!image) return;

  const storageRef = ref(storage, `TEST/${image.name}`);

  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog);
    },
    (error) => console.log(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        setUrlImage(downloadURL);
      });
    }
  );
};
