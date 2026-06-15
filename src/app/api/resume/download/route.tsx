import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import ResumeDocument from '@/components/resume/resume-document';
import { getCollection, orderBy } from '@/lib/firestore';
import type { FirestoreProject, FirestoreSkill, ResumeData } from '@/types';
import { experiences, education } from '@/constants/experience';
import { siteConfig } from '@/constants/site-config';

export async function GET() {
  try {
    const [projects, skills] = await Promise.all([
      getCollection<FirestoreProject>('projects', orderBy('updatedAt', 'desc')),
      getCollection<FirestoreSkill>('skills', orderBy('proficiency', 'desc'))
    ]);

    // Format data
    const resumeData: ResumeData = {
      name: siteConfig.name,
      email: siteConfig.email,
      phone: "", // Expand in future from Firestore settings
      location: "", // Expand in future from Firestore settings
      summary: siteConfig.description,
      skills: skills.slice(0, 20).map((s) => s.name || (s as any).label).filter(Boolean),
      projects: projects.slice(0, 4).map(p => ({
        title: p.title || p.name,
        description: p.description,
        techStack: p.techStack || [],
        githubUrl: p.githubUrl || p.htmlUrl,
        liveUrl: p.liveUrl
      })),
      experience: experiences.map(e => ({
        title: e.title,
        company: e.org,
        duration: e.duration,
        points: e.points
      })),
      education: education.map(e => ({
        degree: e.title,
        institution: e.org,
        duration: e.duration,
        details: e.points
      }))
    };

    // Render to Node.js stream
    const stream = await renderToStream(<ResumeDocument data={resumeData} />);

    // Convert Node.js stream to Web ReadableStream
    const readable = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(new Uint8Array(chunk)));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      }
    });

    return new NextResponse(readable, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="shivang-resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
