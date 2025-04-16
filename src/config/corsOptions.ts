const allowedOrigins = [
  (process.env.FRONTEND_URL ?? "https://localhost:5173").replace(/\/$/, ""),
];

export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    const cleanedOrigin = origin?.replace(/\/$/, "");
    console.log("🔍 Origin recibido:", cleanedOrigin);
    if (cleanedOrigin && allowedOrigins.includes(cleanedOrigin)) {
      callback(null, true);
    } else {
      console.error("⛔ Origin NO permitido:", cleanedOrigin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
