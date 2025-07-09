"use client";

import React, { useState } from "react";
import api from "../api";
import { useRouter } from "next/navigation";

interface CommentType {
  id: number;
  content: string;
  authorId: number;
  createdAt: string;
  isDeleted: boolean;
  parentId?: number;
  children?: CommentType[];
}

interface CommentProps {
  comment: CommentType;
  refresh: () => void;
  userId: number | null;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  refresh,
  userId,
}) => {
  const [replyMode, setReplyMode] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const router = useRouter();

  const canEdit = userId === comment.authorId;

  const handleReply = async () => {
    await api.post("/comments", { content: replyText, parentId: comment.id });
    setReplyText("");
    setReplyMode(false);
    refresh();
  };

  const handleEdit = async () => {
    await api.patch(`/comments/${comment.id}`, {
      id: comment.id,
      content: editText,
    });
    setEditMode(false);
    refresh();
  };

  const handleDelete = async () => {
    await api.patch(`/comments/delete/${comment.id}`, { id: comment.id });
    refresh();
  };

  const handleRestore = async () => {
    await api.patch(`/comments/restore/${comment.id}`, { id: comment.id });
    refresh();
  };

  return (
    <div
      className={`pl-4 border-l-2 ${
        comment.parentId ? "ml-4" : ""
      } border-gray-300 mt-4`}
    >
      {comment.parentId === undefined && !userId && (
        <div className="flex justify-end">
          <button
            className="text-sm font-medium text-blue-600 hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-2">
          {comment.isDeleted ? (
            <em className="text-gray-400 italic">Deleted</em>
          ) : editMode ? (
            <>
              <div className="mb-2">
                <label
                  htmlFor={`edit-text-${comment.id}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Edit Comment
                </label>
                <textarea
                  id={`edit-text-${comment.id}`}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-800">{comment.content}</p>
          )}
        </div>

        <div className="text-sm text-gray-500 mb-2">
          by{" "}
          <span className="font-semibold text-gray-600">
            {comment.authorId}
          </span>{" "}
          on {new Date(comment.createdAt).toLocaleString()}
        </div>

        <div className="flex gap-3 text-sm">
          {!comment.isDeleted && userId && (
            <button
              onClick={() => setReplyMode(!replyMode)}
              className="text-blue-500 hover:underline"
            >
              Reply
            </button>
          )}
          {canEdit && !comment.isDeleted && (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="text-purple-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </>
          )}
          {comment.isDeleted && canEdit && (
            <button
              onClick={handleRestore}
              className="text-green-500 hover:underline"
            >
              Restore
            </button>
          )}
        </div>

        {replyMode && (
          <div className="mt-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleReply}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Post Reply
            </button>
          </div>
        )}
      </div>

      {comment.children?.map((child) => (
        <Comment
          key={child.id}
          comment={child}
          refresh={refresh}
          userId={userId}
        />
      ))}
    </div>
  );
};
