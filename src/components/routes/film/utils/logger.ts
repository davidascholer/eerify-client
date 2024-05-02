export const devDebug = (message: string, data: unknown) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
    console.debug("FILM", message, JSON.stringify(data));
};
