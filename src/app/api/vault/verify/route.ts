import { NextResponse } from 'next/server';
import { prisma } from '../../../../../database/client';

export async function POST(request: Request) {
  try {
    const { documentId } = await request.json();

    if (!documentId) {
      return NextResponse.json({ error: 'documentId is required' }, { status: 400 });
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Simulate AI extracting data and verifying the document by creating an Evidence record
    await prisma.evidence.create({
      data: {
        entityType: 'DOCUMENT',
        entityId: documentId,
        fieldName: 'Authenticity',
        value: 'Confirmed',
        valueType: 'BOOLEAN',
        sourceName: 'AmrootOS AI Intelligence Engine',
        sourceUrl: null,
        sourceTier: 1, // Highest tier for internal AI
        verificationStatus: 'VERIFIED',
        confidenceScore: 98.5,
        documents: {
          connect: { id: documentId }
        }
      }
    });

    // Update document lifecycle
    await prisma.document.update({
      where: { id: documentId },
      data: {
        lifecycleStage: 'VERIFICATION',
        intelligenceScore: 100.0
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
