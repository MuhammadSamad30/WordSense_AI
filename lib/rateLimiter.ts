interface RateLimitEntry {
  timestamps: number[];
}

export class SlidingWindowRateLimiter {
  private cache: Map<string, RateLimitEntry>;
  private limit: number;
  private windowMs: number;

  constructor(limit = 10, windowMinutes = 1) {
    this.cache = new Map<string, RateLimitEntry>();
    this.limit = limit;
    this.windowMs = windowMinutes * 60 * 1000;
  }

  /**
   * Checks if the given identifier (IP) has exceeded the rate limit.
   * Returns true if allowed, false if rate limited.
   */
  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const cleanId = identifier.trim();

    if (!this.cache.has(cleanId)) {
      this.cache.set(cleanId, { timestamps: [now] });
      return {
        allowed: true,
        remaining: this.limit - 1,
        resetTime: now + this.windowMs,
      };
    }

    const entry = this.cache.get(cleanId)!;
    
    // Filter timestamps within the current window
    const windowStart = now - this.windowMs;
    entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart);

    if (entry.timestamps.length >= this.limit) {
      const oldestInWindow = entry.timestamps[0];
      const resetTime = oldestInWindow + this.windowMs;
      return {
        allowed: false,
        remaining: 0,
        resetTime,
      };
    }

    entry.timestamps.push(now);
    this.cache.set(cleanId, entry);

    return {
      allowed: true,
      remaining: this.limit - entry.timestamps.length,
      resetTime: entry.timestamps[0] + this.windowMs,
    };
  }

  // Periodic cleanup of inactive IPs to prevent memory leaks
  cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    for (const [key, entry] of this.cache.entries()) {
      const activeTimestamps = entry.timestamps.filter((ts) => ts > windowStart);
      if (activeTimestamps.length === 0) {
        this.cache.delete(key);
      } else {
        this.cache.set(key, { timestamps: activeTimestamps });
      }
    }
  }
}

// Global rate limiter instance (persisted in server-side memory across requests)
const globalRateLimiter = new SlidingWindowRateLimiter(10, 1);

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    globalRateLimiter.cleanup();
  }, 5 * 60 * 1000);
}

export default globalRateLimiter;
