import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProgressBar from "@src/components/ProgressBar";
import useStorage from "@src/hooks/useStorage";

const schema = z.object({
  imageFileList: z.instanceof(
    typeof FileList !== "undefined" ? FileList : Array
  ),
});

type FormData = z.infer<typeof schema>;

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileUploadProgress, setFileUploadProgress] = useState<number>(0);
  const { url, progress, error } = useStorage(file);

  useEffect(() => {
    setFileUrl(url);
  }, [url]);
  useEffect(() => {
    setFileUploadProgress(progress);
  }, [progress]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const formSubmitHandler: SubmitHandler<FormData> = (data: any) => {
    const possibleFileTypes = ["image/png", "image/jpeg"];

    console.log("before");
    console.log(schema.parse(data));
    console.log("after");
    if (data.imageFileList.length <= 0) {
      setError(
        "imageFileList",
        { type: "focus", message: "No file found. Please pick a jpeg or png." },
        { shouldFocus: true }
      );
    }
    if (error) {
      setError(
        "imageFileList",
        { type: "focus", message: error },
        { shouldFocus: true }
      );
    }
    if (data.imageFileList.length === 1) {
      // check the file type
      if (possibleFileTypes.includes(data.imageFileList[0].type)) {
        // upload a single image to firebase
        // data.imageFileList[0]
        console.log(data.imageFileList[0].name);
        setFile(data.imageFileList[0]);
      } else {
        setError(
          "imageFileList",
          { type: "focus", message: "something is wrong" },
          { shouldFocus: true }
        );
      }
    } else if (data.imageFileList.length > 1) {
      // upload multiple images to firebase
      for (const imageFile of data.imageFileList) {
        if (possibleFileTypes.includes(imageFile.type)) {
          console.log(imageFile.name);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="image-upload-form"
    >
      <div role="group" className="input-group">
        <label htmlFor="image-upload" className="input-label">
          Upload Image
        </label>

        <input
          type="file"
          id="image-upload"
          multiple={true}
          {...register("imageFileList", { required: true })}
        />
        {errors.imageFileList?.type === "required" && (
          <span>This field is required</span>
        )}
        {errors.imageFileList && errors.imageFileList?.message && (
          <span className="error-message">{errors.imageFileList.message}</span>
        )}
      </div>
      <button type="submit" className="btn btn--blue">
        Upload
      </button>
      <div className="output">
        {file && !error && <div>{file.name}</div>}
        {file && !error && (
          <ProgressBar url={fileUrl} progress={fileUploadProgress} />
        )}
        {file && error && <span className="error-message">{error}</span>}
      </div>
    </form>
  );
};

export default UploadForm;
