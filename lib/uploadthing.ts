import {
    generateUploadButton,
    generateUploadDropzone,
    generateReactHelpers,
  } from "@uploadthing/react";
  
  import type { OurFileRouter } from "@/app/api/uploadthing/core";
  
  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
  export const { uploadFiles, useUploadThing } =  generateReactHelpers<OurFileRouter>();

 //uploader is not in the website i have put a simialr thing that included from the video
//generateReactHelpers, 
// export const Uploader =  generateReactHelpers<OurFileRouter>();
  