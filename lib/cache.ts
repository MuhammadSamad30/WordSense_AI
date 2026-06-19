import { SearchResult } from '@/types';

interface CacheEntry {
  data: SearchResult;
  timestamp: number;
}

export class LRUCache {
  private cache: Map<string, CacheEntry>;
  private maxLimit: number;
  private expiryTime: number; // in milliseconds

  constructor(maxLimit = 1000, expiryHours = 24) {
    this.cache = new Map<string, CacheEntry>();
    this.maxLimit = maxLimit;
    this.expiryTime = expiryHours * 60 * 60 * 1000;
  }

  get(key: string): SearchResult | null {
    const normalizedKey = key.trim().toLowerCase();
    if (!this.cache.has(normalizedKey)) {
      return null;
    }

    const entry = this.cache.get(normalizedKey)!;
    const now = Date.now();

    // Check for expiration
    if (now - entry.timestamp > this.expiryTime) {
      this.cache.delete(normalizedKey);
      return null;
    }

    // Refresh position for LRU
    this.cache.delete(normalizedKey);
    this.cache.set(normalizedKey, entry);

    return entry.data;
  }

  set(key: string, value: SearchResult): void {
    const normalizedKey = key.trim().toLowerCase();
    
    // If key exists, delete it first to update its position
    if (this.cache.has(normalizedKey)) {
      this.cache.delete(normalizedKey);
    } else if (this.cache.size >= this.maxLimit) {
      // Evict the oldest (first key in Map iterator)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(normalizedKey, {
      data: value,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

// Global cache instance (persisted in server-side memory across API requests)
const globalCache = new LRUCache();
export default globalCache;
