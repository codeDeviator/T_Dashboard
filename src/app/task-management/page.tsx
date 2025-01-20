
// 'use client';

// import { useState, useEffect } from 'react';

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   status: 'To Do' | 'In Progress' | 'Completed';
// }

// interface TeamMember {
//   id: number;
//   name: string;
//   role: string;
//   tasks: Task[];
// }

// export default function TaskManagementPage() {
//   const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
//   const [taskTitle, setTaskTitle] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskStatus, setTaskStatus] = useState<'To Do' | 'In Progress' | 'Completed'>('To Do');
//   const [editingTask, setEditingTask] = useState<Task | null>(null);

//   // Get memberId from query string
//   const memberId = new URLSearchParams(window.location.search).get('id');

//   useEffect(() => {
//     async function fetchMemberData() {
//       if (memberId) {
//         const response = await fetch('/api/team');
//         const data = await response.json();
//         const member = data.find((m: TeamMember) => m.id === parseInt(memberId));

//         if (member) {
//           setTeamMember(member);
//           loadTasksFromLocalStorage(member.id); 
//         }
//       }
//     }

//     fetchMemberData();
//   }, [memberId]);

//   const loadTasksFromLocalStorage = (id: number) => {
//     const savedTasks = localStorage.getItem(`tasks_${id}`);
//     if (savedTasks) {
//       setTeamMember((prevState) => ({
//         ...prevState!,
//         tasks: JSON.parse(savedTasks),
//       }));
//     }
//   };

//   const saveTasksToLocalStorage = (tasks: Task[]) => {
//     if (teamMember) {
//       localStorage.setItem(`tasks_${teamMember.id}`, JSON.stringify(tasks));
//       triggerDownload(tasks); // Automatically save JSON
//     }
//   };

//   const triggerDownload = (tasks: Task[]) => {
//     const json = JSON.stringify(tasks, null, 2);
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `tasks_${teamMember?.id}.json`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleAddTask = () => {
//     if (taskTitle && taskDescription && teamMember) {
//       const newTask: Task = {
//         id: Date.now(),
//         title: taskTitle,
//         description: taskDescription,
//         status: taskStatus,
//       };
//       const updatedTasks = [...teamMember.tasks, newTask];
//       setTeamMember({ ...teamMember, tasks: updatedTasks });
//       saveTasksToLocalStorage(updatedTasks);

//       // Reset fields
//       setTaskTitle('');
//       setTaskDescription('');
//       setTaskStatus('To Do');
//     }
//   };

//   const handleEditTask = (task: Task) => {
//     setEditingTask(task);
//     setTaskTitle(task.title);
//     setTaskDescription(task.description);
//     setTaskStatus(task.status);
//   };

//   const handleSaveEditedTask = () => {
//     if (editingTask && taskTitle && taskDescription && teamMember) {
//       const updatedTask = { ...editingTask, title: taskTitle, description: taskDescription, status: taskStatus };
//       const updatedTasks = teamMember.tasks.map((task) =>
//         task.id === updatedTask.id ? updatedTask : task
//       );
//       setTeamMember({ ...teamMember, tasks: updatedTasks });
//       saveTasksToLocalStorage(updatedTasks);

//       // Reset fields
//       setEditingTask(null);
//       setTaskTitle('');
//       setTaskDescription('');
//       setTaskStatus('To Do');
//     }
//   };

//   const handleDeleteTask = (taskId: number) => {
//     if (teamMember) {
//       const updatedTasks = teamMember.tasks.filter((task) => task.id !== taskId);
//       setTeamMember({ ...teamMember, tasks: updatedTasks });
//       saveTasksToLocalStorage(updatedTasks);
//     }
//   };

//   // New function to update task status
//   const handleUpdateTaskStatus = (taskId: number, status: 'To Do' | 'In Progress' | 'Completed') => {
//     if (teamMember) {
//       const updatedTasks = teamMember.tasks.map((task) =>
//         task.id === taskId ? { ...task, status } : task
//       );
//       setTeamMember({ ...teamMember, tasks: updatedTasks });
//       saveTasksToLocalStorage(updatedTasks);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-10">
//       {teamMember ? (
//         <>
//           <h1 className="text-5xl font-extrabold text-center text-purple-800 mb-12">
//             {teamMember.name}'s Task Management
//           </h1>

//           <div className="bg-pink-50 shadow-2xl p-8 rounded-3xl max-w-4xl mx-auto border border-purple-200 mb-12">
//             <h3 className="text-2xl font-semibold text-purple-700 mb-6">
//               {editingTask ? 'Edit Task' : 'Add New Task'}
//             </h3>
//             <input
//               type="text"
//               placeholder="Task Title"
//               value={taskTitle}
//               onChange={(e) => setTaskTitle(e.target.value)}
//               className="p-4 border-2 border-purple-400 rounded-xl w-full mb-4 focus:outline-none focus:ring-4 focus:ring-pink-400"
//             />
//             <textarea
//               placeholder="Task Description"
//               value={taskDescription}
//               onChange={(e) => setTaskDescription(e.target.value)}
//               className="p-4 border-2 border-purple-400 rounded-xl w-full mb-4 focus:outline-none focus:ring-4 focus:ring-pink-400"
//             />
//             <select
//               value={taskStatus}
//               onChange={(e) => setTaskStatus(e.target.value as 'To Do' | 'In Progress' | 'Completed')}
//               className="p-4 border-2 border-purple-400 rounded-xl w-full mb-4 focus:outline-none focus:ring-4 focus:ring-pink-400"
//             >
//               <option value="To Do">To Do</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//             <button
//               onClick={editingTask ? handleSaveEditedTask : handleAddTask}
//               className="p-4 bg-purple-500 text-white rounded-full w-full hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all text-xl"
//             >
//               {editingTask ? 'Save Task' : 'Add Task'}
//             </button>
//           </div>

//           <div className="space-y-8">
//             {teamMember.tasks.map((task) => (
//               <div
//                 key={task.id}
//                 className="bg-pink-50 border border-purple-200 shadow-xl p-6 rounded-2xl"
//               >
//                 <h4 className="text-2xl font-bold text-purple-700 mb-2">
//                   {task.title}
//                 </h4>
//                 <p className="text-gray-600 mb-4">{task.description}</p>
//                 <div className="flex items-center justify-between">
//                   <select
//                     value={task.status}
//                     onChange={(e) =>
//                       handleUpdateTaskStatus(task.id, e.target.value as 'To Do' | 'In Progress' | 'Completed')
//                     }
//                     className="p-3 border-2 border-purple-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400"
//                   >
//                     <option value="To Do">To Do</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                   <div className="flex gap-4">
//                     <button
//                       onClick={() => handleEditTask(task)}
//                       className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTask(task.id)}
//                       className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="text-center text-purple-700 text-2xl font-bold">
//           Loading team member data...
//         </div>
//       )}
//     </div>
//   );
// }






'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  tasks: Task[];
}

export default function TaskManagementPage() {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState<'To Do' | 'In Progress' | 'Completed'>('To Do');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const memberIdFromURL = queryParams.get('id');
    setMemberId(memberIdFromURL);
  }, []);

  useEffect(() => {
    async function fetchMemberData() {
      if (memberId) {
        const response = await fetch('/api/team');
        const data = await response.json();
        const member = data.find((m: TeamMember) => m.id === parseInt(memberId));

        if (member) {
          setTeamMember(member);
          loadTasksFromLocalStorage(member.id);
        }
      }
    }

    fetchMemberData();
  }, [memberId]);

  const loadTasksFromLocalStorage = (id: number) => {
    const savedTasks = localStorage.getItem(`tasks_${id}`);
    if (savedTasks) {
      setTeamMember((prevState) => ({
        ...prevState!,
        tasks: JSON.parse(savedTasks),
      }));
    }
  };

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    if (teamMember) {
      localStorage.setItem(`tasks_${teamMember.id}`, JSON.stringify(tasks));
      triggerDownload(tasks); // Automatically save JSON
    }
  };

  const triggerDownload = (tasks: Task[]) => {
    const json = JSON.stringify(tasks, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks_${teamMember?.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddTask = () => {
    if (taskTitle && taskDescription && teamMember) {
      const newTask: Task = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
      };
      const updatedTasks = [...teamMember.tasks, newTask];
      setTeamMember({ ...teamMember, tasks: updatedTasks });
      saveTasksToLocalStorage(updatedTasks);

      // Reset fields
      setTaskTitle('');
      setTaskDescription('');
      setTaskStatus('To Do');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskStatus(task.status);
  };

  const handleSaveEditedTask = () => {
    if (editingTask && taskTitle && taskDescription && teamMember) {
      const updatedTask = { ...editingTask, title: taskTitle, description: taskDescription, status: taskStatus };
      const updatedTasks = teamMember.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTeamMember({ ...teamMember, tasks: updatedTasks });
      saveTasksToLocalStorage(updatedTasks);

      // Reset fields
      setEditingTask(null);
      setTaskTitle('');
      setTaskDescription('');
      setTaskStatus('To Do');
    }
  };

  const handleDeleteTask = (taskId: number) => {
    if (teamMember) {
      const updatedTasks = teamMember.tasks.filter((task) => task.id !== taskId);
      setTeamMember({ ...teamMember, tasks: updatedTasks });
      saveTasksToLocalStorage(updatedTasks);
    }
  };

  const handleUpdateTaskStatus = (taskId: number, status: 'To Do' | 'In Progress' | 'Completed') => {
    if (teamMember) {
      const updatedTasks = teamMember.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      );
      setTeamMember({ ...teamMember, tasks: updatedTasks });
      saveTasksToLocalStorage(updatedTasks);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-10">
      {teamMember ? (
        <>
          <h1 className="text-5xl font-extrabold text-center text-purple-800 mb-12">
            {teamMember.name}&apos;s Task Management
          </h1>

          <div className="bg-pink-50 shadow-2xl p-8 rounded-3xl max-w-4xl mx-auto border border-purple-200 mb-12">
            <h3 className="text-2xl font-semibold text-purple-700 mb-6">
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </h3>
            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="p-4 border-2 border-purple-400 rounded-xl w-full mb-4 focus:outline-none focus:ring-4 focus:ring-pink-400"
            />
            <textarea
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="p-4 border-2 border-purple-400 rounded-xl w-full mb-4 focus:outline-none focus:ring-4 focus:ring-pink-400"
            />
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value as 'To Do' | 'In Progress' | 'Completed')}
              className="p-4 border-2 border-purple-400 rounded-xl w-full mb-4 focus:outline-none focus:ring-4 focus:ring-pink-400"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={editingTask ? handleSaveEditedTask : handleAddTask}
              className="p-4 bg-purple-500 text-white rounded-full w-full hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all text-xl"
            >
              {editingTask ? 'Save Task' : 'Add Task'}
            </button>
          </div>

          <div className="space-y-8">
            {teamMember.tasks.map((task) => (
              <div
                key={task.id}
                className="bg-pink-50 border border-purple-200 shadow-xl p-6 rounded-2xl"
              >
                <h4 className="text-2xl font-bold text-purple-700 mb-2">
                  {task.title}
                </h4>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex items-center justify-between">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleUpdateTaskStatus(task.id, e.target.value as 'To Do' | 'In Progress' | 'Completed')
                    }
                    className="p-3 border-2 border-purple-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-purple-700 text-2xl font-bold">
          Loading team member data...
        </div>
      )}
    </div>
  );
}
