"use client"
import React, { useState } from 'react'
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2Icon } from 'lucide-react'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'


function UploadPdfDialog({ children ,isMaxFile}) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument=useAction(api.myaction.ingest)
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();
  const [open,setOpen] = useState(false);
  const { user } = useUser();

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const OnUpload = async () => {
    setLoading(true);
    try {
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });
      const { storageId } = await result.json();

      // Step 3: Get the file URL
      const fileUrl = await getFileUrl({ storageId: storageId });

      // Step 4: Save the newly allocated storage id to the database
      const fileId = uuid4();
      const resp = await addFileEntry({
        fileId: fileId,
        storageId: storageId,
        fileName: fileName ?? "unTitled File",
        fileUrl: fileUrl, // Ensure this is populated
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      // console.log("response :", resp);

      //API call to fetch PDF Process Data
      const ApiResult = await axios.get('/api/pdf-loader?pdfUrl='+fileUrl);
      console.log(ApiResult.data.result);
      await embeddDocument({
        splitText:ApiResult.data.result,
        fileId:fileId
      });
      // console.log(embedResult);
      setLoading(false);

    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
      setOpen(false);

      toast('File is ready !!')
    }
  };

  return (
    <Dialog open = {open}>
      <DialogTrigger asChild>
        <Button onClick={()=>setOpen(true)} disabled={isMaxFile} className='w-full'>+ Upload PDF File </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="mt-5">Select a file to Upload</h2>
              <div className="gap-2 p-3 rounded-md border">
                <input type="file" accept="application/pdf" onChange={OnFileSelect} />
              </div>
              <div className="mt-2">
                <label>File Name *</label>
                <Input placeholder="File Name" onChange={(e) => setFileName(e.target.value)} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload} disabled = {loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;