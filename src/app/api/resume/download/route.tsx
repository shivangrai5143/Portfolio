import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const resumePath = path.join(process.cwd(), 'public', 'resume.pdf');
    const fileBuffer = await readFile(resumePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Shivang_Rai_Resume.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error serving resume PDF:', error);
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }
}
