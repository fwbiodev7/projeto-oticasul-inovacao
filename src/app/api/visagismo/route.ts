import { NextResponse } from 'next/server';
import { analyzeFace, VisagismoError } from '@/lib/gemini';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json() as { image?: unknown };
    if (typeof body.image !== 'string' || !/^data:image\/(jpeg|png|webp);base64,/.test(body.image)) return NextResponse.json({ error: 'Envie uma foto JPG, PNG ou WebP.' }, { status: 400 });
    if (body.image.length > 14_000_000) return NextResponse.json({ error: 'A foto deve ter até 10 MB.' }, { status: 413 });
    const result = await analyzeFace(body.image);
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof VisagismoError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: 'Não foi possível analisar a foto.' }, { status: 400 });
  }
}
