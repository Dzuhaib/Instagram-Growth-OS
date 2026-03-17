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
    // 1. Exchange code for short-lived access token
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
    const userId = tokenData.user_id;

    // 2. Fetch User Profile (to get the handle/username)
    const profileResponse = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
    );
    const profileData = await profileResponse.json();

    // 3. Return to onboarding with success state and data
    // In a real app, you would save accessToken to a database here.
    // For now, we'll pass the username back to be stored in localStorage.
    const response = NextResponse.redirect(
      new URL(`/onboarding?step=4&method=instagram&handle=${profileData.username}`, req.url)
    );
    
    // We could set a cookie here for the token, but for now let's just use the URL/LocalStorage approach
    // to match the existing front-end architecture.
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
