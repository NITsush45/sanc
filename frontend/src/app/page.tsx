'use client';

import { CommentList } from '@/comments/CommentList';
import { Notifications } from '@/notifications/Notifications';
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-lg mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-blue-700">CommentApp</h1>
        
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 rounded-md bg-white text-blue-600 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out shadow-sm">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-sm">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Comments Section */}
        <div className="bg-white shadow-md rounded-lg p-6 animate-slide-up">
          <CommentList />
        </div>

        {/* Notifications Section */}
        <div className="bg-white shadow-md rounded-lg p-6 animate-slide-up delay-200">
          <Notifications />
        </div>
      </div>
    </main>
  );
}
