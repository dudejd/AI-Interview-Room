const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create a demo user
    const user = await prisma.user.upsert({
        where: { email: 'ishan@example.com' },
        update: {},
        create: {
            name: 'Ishan Jadhav',
            email: 'ishan@example.com',
        },
    });

    console.log(`Created user: ${user.name}`);

    // Create initial questions
    const questions = [
        { text: 'Tell me about yourself and your background.', category: 'general', difficulty: 'Easy' },
        { text: 'Why do you want to work for this company?', category: 'general', difficulty: 'Medium' },
        { text: 'Explain the concept of closures in JavaScript.', category: 'technical', difficulty: 'Medium' },
        { text: 'How do you handle state management in React?', category: 'technical', difficulty: 'Hard' },
        { text: 'Describe a time you handled a difficult conflict at work.', category: 'behavioral', difficulty: 'Medium' },
        { text: 'Tell me about a time you failed and what you learned.', category: 'behavioral', difficulty: 'Medium' },
        { text: 'What are your salary expectations?', category: 'hr', difficulty: 'Easy' },
        { text: 'Where do you see yourself in five years?', category: 'hr', difficulty: 'Medium' },
    ];

    for (const q of questions) {
        await prisma.question.create({
            data: q
        });
    }

    console.log('Seeded 8 questions.');
    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
