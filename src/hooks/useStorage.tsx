import { useEffect, useState } from "react";
import {
  getDownloadURL,
  projectStorage,
  ref,
  uploadBytesResumable,
} from "@src/firebase/config";

function useStorage(file: File | null): {
  progress: number;
  error: string | null;
  url: string | null;
} {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    // references
    const storageRef = ref(projectStorage, file?.name);
    let isImageAlreadyInDB = true;

    (async () => {
      try {
        const downloadURL = await getDownloadURL(storageRef);
        isImageAlreadyInDB = true;
        setError(
          file?.name + " has already been uploaded. Please choose a new image."
        );
        console.error("image already exists in database", downloadURL);
      } catch (error) {
        isImageAlreadyInDB = false;
        console.log("image is verified as being new.", error);
        console.log("isImageAlreadyInDB: ", isImageAlreadyInDB);
        if (!file) {
          console.log("missing file");
        } else {
          console.log("there is a file");
        }
        if (!isImageAlreadyInDB) {
          console.log("image is new!");
        } else {
          console.log("image is not new!");
        }

        if (!isImageAlreadyInDB && file) {
          console.log("ready to upload");
          const uploadTask = uploadBytesResumable(storageRef, file, {
            contentType: file.type,
          });
          uploadTask.on(
            "state_changed",
            (snapshot: any) => {
              let progressPercentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progressPercentage);
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error: any) => {
              console.error("There was an error with the upload", error);
              setError(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setUrl(downloadURL);
              console.log("File available at", downloadURL);
            }
          );
        }
      }
    })();
  }, [file]);

  return { progress, url, error };
}

export default useStorage;
