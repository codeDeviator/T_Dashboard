
'use client';

import { useState, useEffect } from 'react';

// Team Member Interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
}

export default function HomePage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeamMembers, setFilteredTeamMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState({ name: '', role: '', bio: '' });

  useEffect(() => {
    // Simulated API call to fetch team data
    const fetchTeamData = async () => {
      const response = await fetch('/api/team');
      const data = await response.json();
      setTeamMembers(data);
      setFilteredTeamMembers(data);
    };
    fetchTeamData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = teamMembers.filter((member) =>
      [member.name, member.role].some((field) =>
        field.toLowerCase().includes(query.toLowerCase())
      )
    );

    setFilteredTeamMembers(filtered);
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.role && newMember.bio) {
      const newMemberData = {
        id: Date.now(),
        name: newMember.name,
        role: newMember.role,
        bio: newMember.bio,
      };
      setTeamMembers((prev) => [...prev, newMemberData]);
      setFilteredTeamMembers((prev) => [...prev, newMemberData]);
      setNewMember({ name: '', role: '', bio: '' }); // Reset form
    }
  };

  const handleDeleteMember = (id: number) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    setFilteredTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-green-50 to-yellow-100 p-8">
      <h1 className="text-6xl font-extrabold text-center text-green-800 mb-12 drop-shadow-lg">
        Our Team
      </h1>
  
      {/* Search Bar */}
      <div className="mb-12 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or role..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-5 text-xl border-2 border-yellow-400 rounded-full shadow-xl w-full max-w-xl focus:outline-none focus:ring-4 focus:ring-green-500 transition-all"
        />
      </div>
  
      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeamMembers.length > 0 ? (
          filteredTeamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-yellow-50 shadow-2xl rounded-2xl p-8 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-green-200"
            >
              
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-green-700">
                  {member.name}
                </h2>
                <p className="text-xl text-yellow-600">{member.role}</p>
                <p className="text-sm text-gray-500">ID: {member.id}</p>
              </div>
  
             
              <p className="text-center text-gray-700 leading-relaxed mb-8">
                {member.bio}
              </p>
  
              
              <div className="flex gap-6">
                <a
                  href={`/task-management?id=${member.id}`}
                  className="bg-green-500 text-white py-3 px-8 rounded-full hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all text-lg"
                >
                  Manage Tasks
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-red-500 text-xl font-semibold">
            No team members match your search.
          </div>
        )}
      </div>
    </div>
  );
  
  


