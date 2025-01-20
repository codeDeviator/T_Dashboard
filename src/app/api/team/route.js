
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
    },
    {
  id: 6,
  name: 'Toni Kroos',
  role: 'Sales Manager',
  bio: 'Smith manages our sales team and oversees client relationships.',
   tasks: [] // Empty tasks for now     
},
{
  id: 7,
  name: 'Marcelo',
  role: 'Software Engineer',
  bio: 'Garcia develops innovative software solutions to meet client needs.',
    tasks: [] // Empty tasks for now
},
{
  id: 8,
  name: 'Sergio Ramos',
  role: 'Financial Analyst',
  bio: 'Brown analyzes financial data to support strategic business decisions.',
    tasks: [] // Empty tasks for now
},
{
  id: 9,
  name: 'Ozil',
  role: 'Project Manager',
  bio: 'Khan oversees project timelines, resources, and deliverables.',
    tasks: [] // Empty tasks for now
},
{
  id: 10,
  name: 'James Rodriguez',
  role: 'Graphic Designer',
  bio: 'Martinez creates visual concepts to communicate ideas that inspire, inform, and captivate clients.',
    tasks: [] // Empty tasks for now
},
{
  id: 11,
  name: 'Lionel Messi',
  role: 'Data Scientist',
  bio: 'Nguyen analyzes complex data sets to extract meaningful insights and trends.',
    tasks: [] // Empty tasks for now
},
{
  id: 12,
  name: 'Neymar',
  role: 'Human Resources Manager',
  bio: 'Sullivan manages recruitment, employee relations, and HR policies.',
    tasks: [] // Empty tasks for now
},

     {
  id: 13,
  name: 'Cravajal',
  role: 'Customer Support Specialist',
  bio: 'Lopez provides timely and accurate support to our valued customers.',
         tasks: [] // Empty tasks for now
},
 {
  id: 14,
  name: 'Kaka',
  role: 'Operations Coordinator',
  bio: 'Wang coordinates daily operations to ensure efficiency and productivity.',
    tasks: [] // Empty tasks for now
},
{
  id: 15,
  name: 'Jude Bellingham',
  role: 'Quality Assurance Tester',
  bio: 'Andersen tests software applications to ensure they meet quality standards and requirements.',
    tasks: [] // Empty tasks for now
},
{
  id: 16,
  name: 'Kylian Mbappe',
  role: 'Content Writer',
  bio: 'Dubois creates engaging content that resonates with our target audience.',
    tasks: [] // Empty tasks for now
},
{
  id: 17,
  name: 'Vini',
  role: 'IT Support Specialist',
  bio: 'Ali troubleshoots and resolves technical issues to keep our systems running smoothly.',
    tasks: [] // Empty tasks for now
},
{
  id: 18,
  name: 'Fedrico Valverde',
  role: 'Marketing Analyst',
  bio: 'Gupta analyzes market trends and consumer behavior to optimize marketing strategies.',
    tasks: [] // Empty tasks for now
},
{
  id: 19,
  name: 'Camavinga',
  role: 'Business Development Manager',
  bio: 'Chen identifies new business opportunities and builds relationships with potential clients.',
    tasks: [] // Empty tasks for now
},
{
  id: 20,
  name: 'Modric',
  role: 'Product Manager',
  bio: 'Johnson oversees product development from concept to launch, ensuring alignment with market needs.',
    tasks: [] // Empty tasks for now
}
  ];

  
  export async function GET() {
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
  
