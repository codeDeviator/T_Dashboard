
// app/api/team/route.js

let teamMembers = [
    {
      id: 1,
      name: 'Ayush',
      role: 'CEO',
      bio: 'Ayush is the visionary behind our company and leads the strategy.',
      tasks: [] // Empty tasks for now
    },
    {
      id: 2,
      name: 'Cristiano',
      role: 'CTO',
      bio: 'Cristiano is responsible for the technological direction of the company.',
      tasks: [] // Empty tasks for now
    },
    {
      id: 3,
      name: 'Ronaldo',
      role: 'Lead Developer',
      bio: 'Ronaldo is the mastermind behind the development of our core products.',
      tasks: [] // Empty tasks for now
    },
    {
      id: 4,
      name: 'Sharma',
      role: 'Project Manager',
      bio: 'Sharma manages the timeline and resources for various projects.',
      tasks: [] // Empty tasks for now
    },
    {
      id: 5,
      name: 'Verstappen',
      role: 'Marketing Head',
      bio: 'Verstappen leads our marketing strategy and campaigns to boost brand visibility.',
      tasks: [] // Empty tasks for now
    }
  ];
  
  export async function GET(req) {
    return new Response(JSON.stringify(teamMembers), { status: 200 });
  }
  
  export async function POST(req) {
    const { memberId, task } = await req.json();
  
    const member = teamMembers.find((m) => m.id === memberId);
    if (member) {
      // Add the task to the member's task list
      member.tasks.push(task);
      return new Response(JSON.stringify(member), { status: 200 });
    }
  
    return new Response('Member not found', { status: 404 });
  }
  