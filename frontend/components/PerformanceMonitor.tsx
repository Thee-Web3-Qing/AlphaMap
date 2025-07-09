"use client";
import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Track page load performance
    if (typeof window !== 'undefined') {
      // Wait for page to fully load
      window.addEventListener('load', () => {
        // Get performance metrics
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        // Calculate key metrics
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        const firstPaint = paint.find(entry => entry.name === 'first-paint')?.startTime || 0;
        const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
        
        // Log performance data (in production, this would be sent to analytics)
        console.log('Performance Metrics:', {
          loadTime: `${loadTime.toFixed(2)}ms`,
          domContentLoaded: `${domContentLoaded.toFixed(2)}ms`,
          firstPaint: `${firstPaint.toFixed(2)}ms`,
          firstContentfulPaint: `${firstContentfulPaint.toFixed(2)}ms`,
          url: window.location.pathname
        });
        
        // Send to analytics if available
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'page_performance', {
            load_time: loadTime,
            dom_content_loaded: domContentLoaded,
            first_paint: firstPaint,
            first_contentful_paint: firstContentfulPaint,
            page_path: window.location.pathname
          });
        }
      });
      
      // Track font loading performance
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          console.log('Fonts loaded successfully');
        });
      }
    }
  }, []);

  return null; // This component doesn't render anything
} 