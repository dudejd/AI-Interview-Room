"use server"

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- USER ACTIONS ---
export async function getUsers() {
    return await prisma.user.findMany({
        include: { interviews: true },
        orderBy: { createdAt: 'desc' }
    });
}

export async function registerUser(data: { name: string, email: string, role: string, experience: string, faceImage?: string }) {
    try {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                role: data.role,
                experience: data.experience,
                faceEmbedding: data.faceImage // Storing base64 image as mock embedding
            }
        });
        return { success: true, user };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error: "Registration failed. Email might already exist." };
    }
}

export async function deleteUser(id: string) {
    await prisma.user.delete({ where: { id } });
    revalidatePath('/admin');
}

// --- QUESTION ACTIONS ---
export async function getQuestions(category?: string) {
    if (category) {
        return await prisma.question.findMany({ where: { category } });
    }
    return await prisma.question.findMany();
}

export async function upsertQuestion(id: string | null, data: { text: string, category: string, difficulty: string }) {
    if (id) {
        await prisma.question.update({
            where: { id },
            data
        });
    } else {
        await prisma.question.create({
            data
        });
    }
    revalidatePath('/admin');
    revalidatePath('/dashboard');
}

export async function deleteQuestion(id: string) {
    await prisma.question.delete({ where: { id } });
    revalidatePath('/admin');
}

// --- SESSION ACTIONS ---
export async function createSession(data: { userId: string, type: string }) {
    return await prisma.interviewSession.create({
        data: {
            ...data,
            overallScore: 0,
            confidenceScore: 0,
            commScore: 0
        }
    });
}

export async function getStats() {
    const totalStudents = await prisma.user.count();
    const totalSessions = await prisma.interviewSession.count();
    const sessions = await prisma.interviewSession.findMany({
        select: { overallScore: true, createdAt: true }
    });

    const avgScore = sessions.length > 0
        ? Math.round(sessions.reduce((acc: number, s: { overallScore: number | null }) => acc + (s.overallScore || 0), 0) / sessions.length)
        : 0;

    return {
        totalStudents,
        totalSessions,
        avgScore,
        completionRate: 92 // Mocked for now
    };
}
