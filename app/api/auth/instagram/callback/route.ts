import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/onboarding?error=no_code", req.url));
  }

  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;

  try {
    // 1. Exchange code for Instagram Access Token
    const formData = new FormData();
    formData.append("client_id", clientId || "");
    formData.append("client_secret", clientSecret || "");
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", redirectUri || "");
    formData.append("code", code);

    const tokenResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      body: formData,
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("Instagram Token Error:", tokenData.error);
      return NextResponse.redirect(new URL("/onboarding?error=token_exchange_failed", req.url));
    }

    const accessToken = tokenData.access_token;

    // 2. Fetch Instagram Profile (from Graph API)
    const profileResponse = await fetch(
      `https://graph.instagram.com/v19.0/me?fields=id,username,name,profile_picture_url&access_token=${accessToken}`
    );
    const profileData = await profileResponse.json();

    if (profileData.error) {
      console.error("Profile Fetch Error:", profileData.error);
      return NextResponse.redirect(new URL("/onboarding?error=profile_fetch_failed", req.url));
    }

    const igUsername = profileData.username;

    // 3. Return to onboarding with success state and data
    const response = NextResponse.redirect(
      new URL(`/onboarding?step=4&method=instagram&handle=${igUsername}`, req.url)
    );
    
    // Store access token in a secure cookie
    response.cookies.set("ig_access_token", accessToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 60 // 60 days
    });

    return response;
  } catch (error) {
    console.error("Instagram Auth Error:", error);
    return NextResponse.redirect(new URL("/onboarding?error=internal_server_error", req.url));
  }
}
