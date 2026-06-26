import { NextResponse } from 'next/server';
import { getAdminCollection } from '@/lib/firestore-admin';
import type { Skill } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const skills = await getAdminCollection<Skill>('skills', 'proficiency', 'desc');

    // Secondary sort: alphabetically within the same proficiency
    skills.sort((a, b) => {
      if ((b.proficiency || 0) !== (a.proficiency || 0)) {
        return (b.proficiency || 0) - (a.proficiency || 0);
      }
      return a.label.localeCompare(b.label);
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error('[API /github/skills]', error);
    // Return empty array rather than 500 — skills are non-critical
    return NextResponse.json([]);
  }
}
