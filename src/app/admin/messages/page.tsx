"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Trash2, Loader2, MessageSquare, Check, X } from "lucide-react";
import { getCollection, updateDocument, deleteDocument, orderBy } from "@/lib/firestore";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [readingId, setReadingId] = useState<string | null>(null);

  const loadMessages = async () => {
    setLoading(true);
    // Sort by createdAt descending natively using string comparison since we stored ISO strings
    const data = await getCollection<Message>("messages");
    setMessages(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const toggleReadStatus = async (msg: Message) => {
    setReadingId(msg.id);
    await updateDocument("messages", msg.id, { read: !msg.read });
    setReadingId(null);
    loadMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setDeletingId(id);
    await deleteDocument("messages", id);
    setDeletingId(null);
    loadMessages();
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare size={22} className="text-blue-400" /> Messages
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {messages.length} total messages {unreadCount > 0 && `• ${unreadCount} unread`}
          </p>
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={24} className="text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-slate-900 border rounded-2xl p-5 flex flex-col md:flex-row gap-4 transition-colors ${
                  !msg.read ? "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-slate-800"
                }`}
              >
                {/* Status Indicator */}
                <div className="hidden md:flex items-start pt-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${!msg.read ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "bg-slate-700"}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${!msg.read ? "text-white" : "text-slate-300"}`}>
                        {msg.name}
                      </h3>
                      <a href={`mailto:${msg.email}`} className="text-sm text-slate-500 hover:text-blue-400 truncate">
                        &lt;{msg.email}&gt;
                      </a>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="bg-slate-950/50 border border-slate-800/50 rounded-xl p-4 text-sm text-slate-300 whitespace-pre-wrap">
                    {msg.message}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-2 shrink-0 md:pl-2 md:border-l border-slate-800 justify-end md:justify-start pt-2 md:pt-0">
                  <button suppressHydrationWarning
                    onClick={() => toggleReadStatus(msg)}
                    disabled={readingId === msg.id}
                    className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      msg.read
                        ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                        : "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    }`}
                  >
                    {readingId === msg.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : msg.read ? (
                      <>
                        <X size={14} /> Mark Unread
                      </>
                    ) : (
                      <>
                        <Check size={14} /> Mark Read
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${msg.email}`}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    <Mail size={14} /> Reply
                  </a>
                  <button suppressHydrationWarning
                    onClick={() => handleDelete(msg.id)}
                    disabled={deletingId === msg.id}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-medium transition-colors md:mt-auto"
                  >
                    {deletingId === msg.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <>
                        <Trash2 size={14} /> Delete
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {!loading && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p>No messages yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
