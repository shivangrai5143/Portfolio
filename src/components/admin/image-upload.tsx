"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileImage, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  /** Cloudinary folder (e.g. "projects", "profile", "certificates", "resume") */
  folder?: string;
  /** "image" for photos, "raw" for PDFs */
  resourceType?: "image" | "raw";
  /** Current value (URL) */
  value?: string;
  /** Callback when upload succeeds */
  onUpload: (url: string) => void;
  /** Optional label */
  label?: string;
  /** Accept string for input */
  accept?: string;
  /** Max display height of preview (px) */
  previewHeight?: number;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export function ImageUpload({
  folder = "general",
  resourceType = "image",
  value,
  onUpload,
  label,
  accept,
  previewHeight = 200,
}: ImageUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPDF = resourceType === "raw";
  const defaultAccept = isPDF ? ".pdf" : "image/*";

  const uploadFile = useCallback(
    async (file: File) => {
      setStatus("uploading");
      setErrorMsg("");

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);
        formData.append("resource_type", resourceType);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Upload failed");
        }

        onUpload(data.url);
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Upload failed";
        setErrorMsg(message);
        setStatus("error");
      }
    },
    [folder, resourceType, onUpload]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemove = () => {
    onUpload("");
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-slate-300">{label}</label>
      )}

      {/* Drop Zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer ${
          dragOver
            ? "border-blue-400 bg-blue-500/10"
            : "border-slate-700 hover:border-slate-500 bg-slate-800/50"
        }`}
        style={{ minHeight: 120 }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept || defaultAccept}
          onChange={handleFileChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {status === "uploading" ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6"
            >
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <p className="text-slate-400 text-sm">Uploading to Cloudinary…</p>
            </motion.div>
          ) : status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <p className="text-emerald-400 text-sm font-medium">Upload successful!</p>
            </motion.div>
          ) : status === "error" ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
            >
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-red-400 text-sm">{errorMsg}</p>
              <button
                onClick={(e) => { e.stopPropagation(); setStatus("idle"); }}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Try again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-3 p-8"
            >
              {isPDF ? (
                <FileText className="w-8 h-8 text-slate-500" />
              ) : (
                <FileImage className="w-8 h-8 text-slate-500" />
              )}
              <div className="text-center">
                <p className="text-slate-300 text-sm font-medium">
                  {dragOver ? "Drop file here" : "Click or drag & drop"}
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  {isPDF ? "PDF, max 20 MB" : "PNG, JPG, WebP, max 10 MB"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Preview */}
      {value && status !== "uploading" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-xl overflow-hidden border border-slate-700"
          style={{ height: isPDF ? "auto" : previewHeight }}
        >
          {isPDF ? (
            <div className="flex items-center gap-3 p-4 bg-slate-800/50">
              <FileText className="w-6 h-6 text-blue-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-medium truncate">Resume uploaded</p>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-xs hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  View PDF →
                </a>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <>
              <Image
                src={value}
                alt="Uploaded preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <button
                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white hover:bg-red-500/80 transition-colors"
              >
                <X size={14} />
              </button>
            </>
          )}
        </motion.div>
      )}

      {/* Upload icon if no preview */}
      {!value && status === "idle" && (
        <p className="text-slate-600 text-xs text-center">
          Uploads are stored securely on Cloudinary
        </p>
      )}
    </div>
  );
}
