import React, { useState, useEffect } from 'react';
import api from '../api';

interface NotificationType {
  id: number;
  commentId: number;
  isRead: boolean;
}

export const Notifications: React.FC = () => {
  const [notes, setNotes] = useState<NotificationType[]>([]);

  const refresh = async () => {
    const res = await api.get<NotificationType[]>('/notifications');
    setNotes(res.data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const toggle = async (id: number, isRead: boolean) => {
    await api.patch(`/notifications/${id}`, { isRead });

    refresh();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        🔔 Notifications
      </h2>

      {notes.length === 0 ? (
        <p className="text-gray-500 text-center">No notifications to show.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-lg shadow-md border transition duration-200 cursor-pointer ${
                n.isRead
                  ? 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                  : 'bg-blue-50 hover:bg-blue-100 border-blue-300'
              }`}
              onClick={() => toggle(n.id, !n.isRead)}
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-800">
                  💬 You have a reply to your comment (ID: <strong>{n.commentId}</strong>)
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    n.isRead
                      ? 'bg-gray-300 text-gray-700'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {n.isRead ? 'Read' : 'Unread'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
