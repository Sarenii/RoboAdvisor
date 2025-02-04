import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-shade-1 text-white py-4 mt-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          RoboAdvisor &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
