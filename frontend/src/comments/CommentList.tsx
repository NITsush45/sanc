"use client";

import React, { useState, useEffect } from "react";
import api from "../api";
import { Comment } from "./Comment";
import { jwtDecode } from "jwt-decode";

interface CommentType {
  id: number;
  content: string;
  authorId: number;
  createdAt: string;
  isDeleted: boolean;
  parentId?: number;
  children?: CommentType[];
}

export const CommentList: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");

  const refresh = async () => {
    const res = await api.get("/comments");
    setComments(res.data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handlePost = async () => {
    if (!newComment.trim()) return;
    await api.post("/comments", { content: newComment });
    setNewComment("");
    refresh();
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userId = token ? jwtDecode<{ sub: number }>(token).sub : null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Leave a Comment
      </h2>

      <div className="mb-6">
        <label
          htmlFor="new-comment"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Comment
        </label>
        <textarea
          id="new-comment"
          placeholder="Write something insightful..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
        <button
          onClick={handlePost}
          className="mt-3 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 shadow-md"
        >
          Post
        </button>
      </div>

      <hr className="my-6 border-gray-300" />

      <h3 className="text-xl font-semibold text-gray-700 mb-3">All Comments</h3>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((c) => (
            <Comment key={c.id} comment={c} refresh={refresh} userId={userId} />
          ))
        ) : (
          <p className="text-gray-800 text-sm">
            No comments yet. Be the first!
          </p>
        )}
      </div>
    </div>
  );
};
