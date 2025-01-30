import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const id = request?.nextUrl?.searchParams.get("id");
  
  try {
      let response;

      if (id) {
          const memo = await prisma.memo.findFirst({
              where: {
                  id: parseInt(id)
              }
          });
          // memoが存在しない場合は404を返す
          if (!memo) {
              return NextResponse.json({ message: "Memo not found" }, { status: 404 });
          }
          response = NextResponse.json(memo, { status: 200 });
      } else {
          const memos = await getAllMemos();
          response = NextResponse.json(memos, { status: 200 });
      }

      return response;
  } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
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