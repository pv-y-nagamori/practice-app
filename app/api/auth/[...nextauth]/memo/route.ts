import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    let jsonData = null;
    try
    {
        // TODO:ユーザ検索処理
        const memos = await getAllMemos();
        jsonData = NextResponse.json(memos);
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
    const { data } = await request.json();

    // TODO:ユーザ検索処理
    
    await prisma.memo.create({
      data: {
        title: data?.title,
        content: data?.content
      },
    });

    return NextResponse.redirect(new URL('/', request.url))
}

export async function DELETE(request: NextRequest) {
    let jsonData = null;
    try
    {
        const id = parseInt(request.nextUrl.searchParams.get('id')!);
  
        await prisma.memo.delete({
          where: {
            id: id,
          },
        });
      
        const memos = await getAllMemos();

        jsonData = NextResponse.json(memos)
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


async function getAllMemos() {
    const notes = await prisma.memo.findMany();
    return notes;
}