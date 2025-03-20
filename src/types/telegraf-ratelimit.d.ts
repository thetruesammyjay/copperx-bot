declare module 'telegraf-ratelimit' {
    import { Context, Middleware } from 'telegraf';
  
    interface RateLimitOptions {
      window: number; // Time window in milliseconds
      limit: number; // Max number of requests within the time window
      onLimitExceeded?: (ctx: Context) => void; // Callback when the limit is exceeded
      keyGenerator?: (ctx: Context) => string; // Function to generate a unique key for rate-limiting
    }
  
    function rateLimit(options: RateLimitOptions): Middleware<Context>;
  
    export = rateLimit;
  }