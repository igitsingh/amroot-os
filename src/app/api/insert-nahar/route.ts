import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const supplierName = "Nahar Organics";
    
    // Create Supplier
    let supplier = await prisma.supplier.findUnique({
      where: { name: supplierName }
    });

    if (!supplier) {
      supplier = await prisma.supplier.create({
        data: {
          name: supplierName,
          lifecycleStage: 'DISCOVERED',
          intelligenceScore: 85.0
        }
      });
    }

    const evidences = [
      { fieldName: 'GST Number', value: '18BLQPG3257H1ZT' },
      { fieldName: 'Legal Name', value: 'BINITA GOGOI' },
      { fieldName: 'Address', value: 'Office No-103, 1st Floor, DN Tower, Basistha Chariali, NH-37, PS- Baisistha, Guwahati, Assam - 781029' },
      { fieldName: 'Contact Person', value: 'Suraj Baruah (Business Development Associate)' },
      { fieldName: 'Phone', value: '+919287501662, +918840243048, +919287996189' },
      { fieldName: 'Email', value: 'bassociate45@gmail.com, info@naharorganics.com, sales@naharorganics.com' },
      { fieldName: 'Website', value: 'www.naharorganics.com' },
      { fieldName: 'Products', value: 'Premium range of spices & herbs, NPOP/NOP products' },
      { fieldName: 'Pricing: Lakadong Turmeric Slice', value: '340/kg (ex factory)' },
      { fieldName: 'Pricing: Lakadong Turmeric Powder', value: '480/kg (ex factory)' }
    ];

    for (const ev of evidences) {
      await prisma.evidence.create({
        data: {
          entityType: 'Supplier',
          entityId: supplier.id,
          fieldName: ev.fieldName,
          value: ev.value,
          valueType: 'String',
          sourceName: 'Inbound Lead (WhatsApp & Documents)',
          sourceTier: 1,
          confidenceScore: 100,
          verificationStatus: 'VERIFIED'
        }
      });
    }

    return NextResponse.json({ success: true, message: 'Successfully added Nahar Organics and its evidence.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
