import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {

    const id = request?.nextUrl?.searchParams.get("id");
    
    let jsonData = null;
    try
    {
      if (!!id) {
        const memo = await prisma.memo.findFirst({
          where: {
            id: parseInt(id) 
          }
        });
        jsonData = NextResponse.json(memo);
      } else {
        const memos = await getAllMemos();
        jsonData = NextResponse.json(memos);
      }

    }
    catch
    {
        jsonData = NextResponse.json({message:"error"})
    }
    finally
    {
        return jsonData;
    }
}

export async function POST(request: NextRequest) {

    const req = await request.json();
    
    await prisma.memo.create({
      data: {
        title: req.title,
        content: req.content
      },
    });

    return NextResponse.json({message:"success"})
}

export async function PUT(request: NextRequest) {

  const req = await request.json();
  
  await prisma.memo.update({
    where: {
      id : parseInt(req.id)
    },
    data: {
      title: req.title,
      content: req.content
    },
  });

  return NextResponse.json({message:"success"})
}


export async function DELETE(request: NextRequest) {

  const id = request?.nextUrl?.searchParams.get("id");
  if (!!id) {
    await prisma.memo.delete({
      where: {
        id : parseInt(id)
    }})
  }
  return NextResponse.json({message:"success"})
}


async function getAllMemos() {
    const notes = await prisma.memo.findMany();
    return notes;
}