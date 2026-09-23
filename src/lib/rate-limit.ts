/**
 * Rate Limiter simples em memória para proteção contra ataques de negação de serviço (DoS)
 * e abuso de cota de inteligência artificial na Vercel / Node.js.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Limpeza periódica automática para não acumular memória
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipMap.entries()) {
    if (record.resetTime <= now) {
      ipMap.delete(ip);
    }
  }
}, 60_000);

export interface RateLimitOptions {
  windowMs: number; // Janela de tempo em milissegundos
  maxRequests: number; // Máximo de requisições por janela
}

export function checkRateLimit(
  clientIp: string,
  options: RateLimitOptions = { windowMs: 60_000, maxRequests: 10 }
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const record = ipMap.get(clientIp);

  if (!record || record.resetTime <= now) {
    ipMap.set(clientIp, {
      count: 1,
      resetTime: now + options.windowMs,
    });
    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetInSec: Math.ceil(options.windowMs / 1000),
    };
  }

  if (record.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSec: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: options.maxRequests - record.count,
    resetInSec: Math.ceil((record.resetTime - now) / 1000),
  };
}

/**
 * Extrai o IP real do cliente mesmo através de proxies da Vercel / Cloudflare
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}
