import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "no file" }, { status: 400 });
  }

  const blob = await put(file.name, file, { 
    access: "public", 
    allowOverwrite: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ 
    url: blob.url,
    pathname: blob.pathname,
  });
}

export async function DELETE(request: Request) {
  const data = await request.formData();
  const pathname = data.get("pathname") as string;

  if (!pathname) {
    return NextResponse.json({ error: "no pathname" }, { status: 400 });
  }

  await del(pathname, { token: process.env.BLOB_READ_WRITE_TOKEN });

  return NextResponse.json({ success: true });
}
