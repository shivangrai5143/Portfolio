import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/firestore';
import type { Skill } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const skills = await getCollection<Skill>('skills');
    
    // Sort by proficiency/count descending, then alphabetically
    skills.sort((a, b) => {
      if ((b.proficiency || 0) !== (a.proficiency || 0)) {
        return (b.proficiency || 0) - (a.proficiency || 0);
      }
      return a.label.localeCompare(b.label);
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error('[API /github/skills]', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}
