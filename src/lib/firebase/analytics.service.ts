import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getFirestore } from './config';
import type { AnalyticsEvent, DeviceType } from '../../models';

class AnalyticsService {
  private lastPageView: string | null = null;
  private lastButtonClick: string | null = null;
  private readonly RATE_LIMIT_MS = 1000; // 1 second between same events

  private getDeviceType(): DeviceType {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private async writeEvent(event: Omit<AnalyticsEvent, 'timestamp'>): Promise<void> {
    try {
      if (typeof window === 'undefined' || window.location.host.includes('localhost')) return;

      const db = getFirestore();
      const analyticsCollection = collection(db, 'analytics_events');
      
      await addDoc(analyticsCollection, {
        ...event,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      // Silent fail - don't block user experience
      console.warn('Analytics tracking failed:', error);
    }
  }

  async trackPageView(page: string): Promise<void> {
    const now = Date.now();
    const key = `page_view:${page}`;
    
    // Rate limiting
    if (this.lastPageView === key) {
      return;
    }
    
    this.lastPageView = key;
    setTimeout(() => {
      if (this.lastPageView === key) {
        this.lastPageView = null;
      }
    }, this.RATE_LIMIT_MS);

    await this.writeEvent({
      eventType: 'page_view',
      page,
      device: this.getDeviceType(),
    });
  }

  async trackButtonClick(tag: string, page: string): Promise<void> {
    const now = Date.now();
    const key = `button_click:${tag}:${page}`;
    
    // Rate limiting
    if (this.lastButtonClick === key) {
      return;
    }
    
    this.lastButtonClick = key;
    setTimeout(() => {
      if (this.lastButtonClick === key) {
        this.lastButtonClick = null;
      }
    }, this.RATE_LIMIT_MS);

    await this.writeEvent({
      eventType: 'button_click',
      page,
      device: this.getDeviceType(),
      tag,
    });
  }
}

export const analytics = new AnalyticsService();

// Export for testing
export { AnalyticsService };