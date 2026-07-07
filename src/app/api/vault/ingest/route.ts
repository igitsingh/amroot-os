import { NextResponse } from 'next/server';
import { prisma } from '@database/client';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const documentType = formData.get('documentType') as any;

    if (!file || !title || !documentType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate SHA-256 Checksum
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');

    // Check if a document with this checksum already exists
    const existingDoc = await prisma.document.findUnique({
      where: { checksum: hash }
    });

    if (existingDoc) {
      return NextResponse.json({ error: 'This exact document already exists in the Vault.' }, { status: 409 });
    }

    // Determine default user (Fallback to first user or create one if db is empty)
    let defaultUser = await prisma.user.findFirst();
    if (!defaultUser) {
      defaultUser = await prisma.user.create({
        data: {
          email: 'founder@amrootos.com',
          name: 'Founder',
          role: 'FOUNDER'
        }
      });
    }

    // Save to local filesystem (public/vault)
    const timestamp = Date.now();
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const newFilename = `${timestamp}-${safeFilename}`;
    const uploadDir = path.join(process.cwd(), 'public/vault');
    const filePath = path.join(uploadDir, newFilename);

    await fs.writeFile(filePath, buffer);

    // Save metadata in database
    const document = await prisma.document.create({
      data: {
        title,
        fileUrl: `/vault/${newFilename}`,
        documentType,
        checksum: hash,
        uploadedById: defaultUser.id,
        lifecycleStage: 'DISCOVERED',
        intelligenceScore: 0.0,
      }
    });

    return NextResponse.json({ success: true, document }, { status: 201 });

  } catch (error: any) {
    console.error('Document ingestion error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
