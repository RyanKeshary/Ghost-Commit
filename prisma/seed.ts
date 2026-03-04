import * as dotenv from "dotenv";
dotenv.config();
import { prisma } from '../src/lib/prisma';



async function main() {
    console.log('Seeding database...')

    // Clear existing data
    await prisma.message.deleteMany()
    await prisma.match.deleteMany()
    await prisma.application.deleteMany()
    await prisma.project.deleteMany()
    await prisma.block.deleteMany()
    await prisma.report.deleteMany()
    await prisma.developer.deleteMany()
    await prisma.user.deleteMany()

    // Create demo developers
    await prisma.developer.createMany({
        data: [
            {
                name: 'Alice Chen',
                semester: 4,
                department: 'Computer Science',
                role: 'Full Stack Developer',
                skills: 'React,TypeScript,Node.js,Python,Tailwind CSS,Next.js',
                bio: 'CS sophomore obsessed with building tools that help people. Previously built a meal-plan tracker for 2k+ students.',
            },
            {
                name: 'Bob Patel',
                semester: 6,
                department: 'Electronic Engineering',
                role: 'Backend Developer',
                skills: 'Python,TensorFlow,PyTorch,SQL,Docker,FastAPI',
                bio: 'Junior in ECE building ML pipelines for fun. Looking for frontend devs to bring models to life.',
            },
            {
                name: 'Carol Liu',
                semester: 5,
                department: 'Design',
                role: 'UI/UX Designer',
                skills: 'Figma,React,CSS,Framer Motion,Illustrator',
                bio: 'Design major with a secret dev life. I prototype in Figma, then build in React.',
            },
            {
                name: 'Dave Nguyen',
                semester: 7,
                department: 'Information Technology',
                role: 'Full Stack Developer',
                skills: 'React Native,Flutter,TypeScript,Firebase,Swift',
                bio: 'Building my third side project. React Native by day, Flutter by night. Always looking for co-founders.',
            },
            {
                name: 'Eva Martinez',
                semester: 8,
                department: 'Computer Science',
                role: 'Backend Developer',
                skills: 'AWS,Docker,Kubernetes,Terraform,Go,Linux',
                bio: "AWS certified. I make sure your infra doesn't fall over at 3am.",
            },
            {
                name: 'Frank Kim',
                semester: 3,
                department: 'Mathematics',
                role: 'Data Scientist',
                skills: 'Python,R,SQL,Tableau,Pandas,Scikit-learn',
                bio: 'Math nerd who fell in love with data. Looking for web devs to help visualize insights.',
            },
        ],
    })

    // Create demo users
    const user1 = await prisma.user.create({
        data: {
            name: 'Alice Chen',
            email: 'alice@college.edu',
            passwordHash: 'demo-hash-not-real',
            semester: 4,
            department: 'Computer Science',
            skills: 'React,TypeScript,Node.js,Python',
            bio: 'CS sophomore obsessed with building tools.',
            lookingFor: 'teammates',
            interests: 'web dev,open source,hackathons',
        },
    })

    const user2 = await prisma.user.create({
        data: {
            name: 'Bob Patel',
            email: 'bob@college.edu',
            passwordHash: 'demo-hash-not-real',
            semester: 6,
            department: 'Electronic Engineering',
            skills: 'Python,TensorFlow,PyTorch,Docker',
            bio: 'ML Engineer & Data Nerd.',
            lookingFor: 'both',
            interests: 'machine learning,data viz,robotics',
        },
    })

    // Create a demo project
    await prisma.project.create({
        data: {
            title: 'Campus Ride Share',
            description: 'A ride-sharing app for students commuting between campuses.',
            requiredSkills: 'React Native,Node.js,PostgreSQL',
            status: 'Open',
            ownerId: user1.id,
        },
    })

    await prisma.project.create({
        data: {
            title: 'AI Study Buddy',
            description: 'An LLM-powered study assistant that generates flashcards from PDFs.',
            requiredSkills: 'Python,React,TensorFlow',
            status: 'Open',
            ownerId: user2.id,
        },
    })

    console.log('Seed complete! 6 developers, 2 users, 2 projects')
}

main()
    .catch((e) => {
        console.error('Seed failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
