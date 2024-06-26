import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';
import { cookies } from 'next/headers';
import generateAccessAndRefreshToken from '@/utils/generateAcessRefreshToken';
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({
        message: 'Please fill in all the fields',
        status: 400,
      });
    }
    const client = await clientPromise;
    const db = client.db();
    const adminCollection = await db.collection('adminDetails');
    const existingAdmin = await adminCollection.findOne({ email });

    if (!existingAdmin) {
      return NextResponse.json({
        message: 'Email does not exist',
        status: 400,
      });
    }
    if (existingAdmin.password !== password) {
      return NextResponse.json({
        message: 'Password is incorrect',
        status: 400,
      });
    }

    const cookieStore = cookies();
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      existingAdmin._id
    );

    if (!accessToken || !refreshToken) {
      return NextResponse.json({
        message: 'Something went wrong while generating tokens',
        status: 400,
      });
    }
    // settin cookies and role as admin
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    cookieStore.set('accessToken', accessToken, cookieOptions);
    cookieStore.set('refreshToken', refreshToken, cookieOptions);
    cookieStore.set('role', 'admin', cookieOptions);
    return NextResponse.json({
      message: 'Login successful',
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 400,
    });
  }
}
