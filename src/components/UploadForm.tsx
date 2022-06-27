import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  imageFileList: z.instanceof(
    typeof FileList !== "undefined" ? FileList : Array
  ),
});

type FormData = z.infer<typeof schema>;

const UploadForm = () => {
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
    if (data.imageFileList.length === 1) {
      // check the file type
      if (!possibleFileTypes.includes(data.imageFileList[0].type)) {
        // upload a single image to firebase
        // data.imageFileList[0]
        console.log(data.imageFileList[0].name);
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
    </form>
  );
};

export default UploadForm;
