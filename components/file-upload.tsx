"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  console.log("Endpoint being used:", endpoint); // Debugging endpoint
  
  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (res?.[0]?.url) {
            console.log("Upload successful:", res[0].url); // Log the URL
            onChange(res[0].url); // Pass the URL to the parent component
          } else {
            toast.error("Upload failed");
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`Upload failed: ${error?.message}`);
        }}
      />
    </div>
  );
};

export default FileUpload;
