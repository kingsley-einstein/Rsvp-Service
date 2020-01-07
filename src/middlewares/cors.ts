export default (origin: string, headers?: string, methods?: string) => {
  return (req: any, res: any, next: any) => {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", headers || "Authorization, Content-Type");
    res.header("Access-Control-Allow-Methods", methods || "GET, DELETE, POST, PATCH");
    next();
  }
}