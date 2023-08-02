import Redis from "ioredis";

const connectRedis = async () => {
  try {
    let redisClient = new Redis({
      host: "localhost",
      port: 6379,
    } as any);

    redisClient.on("connect", () =>
      console.log("-- Connected to Redis server --")
    );

    redisClient.on("error", (error: any) => console.error(`Error : ${error}`));
  } catch (error) {
    console.error(`Error:${error}`);
    process.exit(1);
  }
};

export default connectRedis;
