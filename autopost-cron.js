// /scripts/autopost-cron.js
import { schedule } from "node-cron";
import fetch from "node-fetch";
import pg from "pg";
import { postToYouTube, postToTikTok } from "../lib/upload.js";

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function postToPlatform(video, platform) {
  const tokenRes = await db.query("SELECT access_token FROM oauth_tokens WHERE platform = $1 LIMIT 1", [platform]);
  const token = tokenRes.rows[0]?.access_token;
  if (!token) return console.log(`[WARN] No token for ${platform}`);

  if (platform === "youtube") await postToYouTube(video.url, token);
  else if (platform === "tiktok") await postToTikTok(video.url, token);
}

async function autopost() {
  const now = new Date().toISOString();
  const { rows: scheduled } = await db.query(
    `SELECT schedules.id, schedules.platform, schedules.post_time, videos.url, videos.id as video_id
     FROM schedules
     JOIN videos ON schedules.video_id = videos.id
     WHERE schedules.post_time <= $1`,
    [now]
  );

  for (const task of scheduled) {
    await postToPlatform(task, task.platform);
    await db.query(`DELETE FROM schedules WHERE id = $1`, [task.id]);
  }
}

schedule("* * * * *", async () => {
  console.log("[CRON] Checking for videos to autopost...");
  await autopost();
});

autopost();