import React from 'react';

export default function UserRoles() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">2. User Roles</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Guest:</strong> View general information about the RoboAdvisor and sign up.
        </li>
        <li>
          <strong>Authenticated User:</strong> Access personalized investment features (login, portfolio management, etc.).
        </li>
        <li>
          <strong>Administrator:</strong> Manage user accounts, system monitoring, advanced reports, etc.
        </li>
      </ul>
      {/* Add more details as needed */}
    </div>
  );
}
