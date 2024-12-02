import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { userEmail, accessToken, dynamicsUrl } = await request.json();

  try {
    const user = await prisma.user.upsert({
      where: { email: userEmail },
      update: {
        accessToken,
        dynamicsUrl,
      },
      create: {
        email: userEmail,
        accessToken,
        dynamicsUrl,
      },
    });

    return new Response(JSON.stringify({ success: true, user }), { status: 200 });  
} catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
}
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
    return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
} catch (error) {
    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
  }
}
