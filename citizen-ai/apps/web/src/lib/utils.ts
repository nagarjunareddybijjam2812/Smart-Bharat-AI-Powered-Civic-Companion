import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, locale = 'en-IN'): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(date))
}

export function formatDateTime(date: string | Date, locale = 'en-IN'): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const diff = (new Date(date).getTime() - Date.now()) / 1000
  if (Math.abs(diff) < 60) return rtf.format(Math.round(diff), 'second')
  if (Math.abs(diff) < 3600) return rtf.format(Math.round(diff / 60), 'minute')
  if (Math.abs(diff) < 86400) return rtf.format(Math.round(diff / 3600), 'hour')
  return rtf.format(Math.round(diff / 86400), 'day')
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    OPEN: 'badge-warning',
    ACKNOWLEDGED: 'badge-info',
    IN_PROGRESS: 'badge-info',
    ESCALATED: 'badge-error',
    RESOLVED: 'badge-success',
    CLOSED: 'badge-success',
    APPROVED: 'badge-success',
    REJECTED: 'badge-error',
    DRAFT: 'badge-info',
    SUBMITTED: 'badge-info',
    UNDER_REVIEW: 'badge-warning',
  }
  return map[status] || 'badge-info'
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
