import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://apparent-cowbird-9363.upstash.io",
  token: "ASSTAAImcDJiNzkzYTliODdjYTU0NzQ4ODk2ZmZiMGU0Mzc0NTgwNXAyOTM2Mw"
});

export default redis;
