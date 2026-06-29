"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, CheckCircle2, FileText, ExternalLink, Upload } from "lucide-react";
import { getDocument, setDocument } from "@/lib/firestore";
import { ImageUpload } from "@/components/admin/image-upload";

interface ResumeSettings {
  resumeUrl: string;
  uploadedAt?: string;
  fileName?: string;
}

export default function AdminResumePage() {
  const [data, setData] = useState<ResumeSettings>({ resumeUrl: "" });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const settings = await getDocument<ResumeSettings>("settings", "resume");
        if (settings) setData(settings);
      } catch (e) {
        console.warn("No resume settings found", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!data.resumeUrl) return;
    setSaveStatus("saving");
    try {
      await setDocument("settings", "resume", {
        ...data,
        uploadedAt: new Date().toISOString(),
      });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (e) {
      console.error(e);
      setSaveStatus("error");
    }
  };

  const handleUpload = (url: string) => {
    setData((p) => ({ ...p, resumeUrl: url }));
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white">Resume</h1>
        <p className="text-slate-400 text-sm mt-1">
          Upload your resume PDF to Cloudinary. The &quot;View Resume&quot; button on your portfolio will always link to the latest version.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Upload Section */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-500/15 rounded-xl flex items-center justify-center">
              <Upload size={18} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Upload Resume PDF</h2>
              <p className="text-slate-500 text-xs mt-0.5">Replaces the existing resume link on your portfolio</p>
            </div>
          </div>

          <ImageUpload
            folder="resume"
            resourceType="raw"
            value={data.resumeUrl}
            onUpload={handleUpload}
            label="Resume PDF"
            accept=".pdf"
          />
        </motion.div>

        {/* Current Resume Info */}
        {data.resumeUrl && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">Current Resume</h2>
            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
              <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center shrink-0">
                <FileText size={18} className="text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">Resume.pdf</p>
                {data.uploadedAt && (
                  <p className="text-slate-500 text-xs mt-0.5">
                    Last updated: {new Date(data.uploadedAt).toLocaleDateString("en-US", { dateStyle: "medium" })}
                  </p>
                )}
              </div>
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-xs font-medium"
              >
                <ExternalLink size={12} /> View
              </a>
            </div>
          </motion.div>
        )}

        {/* Save */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={!data.resumeUrl || saveStatus === "saving"}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-blue-500/20"
          >
            {saveStatus === "saving" ? <Loader2 size={15} className="animate-spin" /> : saveStatus === "saved" ? <CheckCircle2 size={15} /> : <Save size={15} />}
            {saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Saved!" : "Save Resume Link"}
          </button>
        </div>

        {saveStatus === "error" && (
          <p className="text-red-400 text-sm text-right">Failed to save. Please try again.</p>
        )}
      </div>
    </div>
  );
}
