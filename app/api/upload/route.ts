import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "no file" }, { status: 400 });
  }

  const blob = await put(file.name, file, { access: "public", allowOverwrite: true });

  return NextResponse.json({ url: blob.url });
}
