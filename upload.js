// /lib/upload.js
import fetch from "node-fetch";
import FormData from "form-data";

export async function postToYouTube(videoUrl, accessToken) {
  const videoRes = await fetch(videoUrl);
  const videoBuffer = await videoRes.buffer();

  const res = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      snippet: {
        title: "AI Generated Video",
        description: "Posted automatically via AI Tool",
        tags: ["AI", "automation"],
        categoryId: "22"
      },
      status: { privacyStatus: "public" }
    })
  });

  const uploadUrl = res.headers.get("location");

  await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Length": videoBuffer.length,
      "Content-Type": "video/*"
    },
    body: videoBuffer
  });

  console.log("[YouTube] Upload complete.");
}

export async function postToTikTok(videoUrl, accessToken) {
  const videoRes = await fetch(videoUrl);
  const videoBuffer = await videoRes.buffer();

  const form = new FormData();
  form.append("video", videoBuffer, "video.mp4");
  form.append("access_token", accessToken);

  const res = await fetch("https://open.tiktokapis.com/v2/video/publish/", {
    method: "POST",
    body: form
  });

  const result = await res.json();
  console.log("[TikTok] Upload result:", result);
}