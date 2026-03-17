import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("ig_access_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Attempt to fetch real profile data including follower count
    const response = await fetch(
      `https://graph.instagram.com/v25.0/me?fields=id,username,name,followers_count,media_count,profile_picture_url&access_token=${token}`
    );
    const data = await response.json();

    if (data.error) {
       console.error("Instagram profile fetch error:", JSON.stringify(data.error));
       return NextResponse.json({ error: "Meta API limitation or token invalid", details: data.error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error connecting to Instagram:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
