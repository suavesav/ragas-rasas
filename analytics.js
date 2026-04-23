// Vercel Web Analytics integration for vanilla HTML/JavaScript
// This script initializes Vercel Analytics using the inject method
// Documentation: https://vercel.com/docs/analytics/quickstart

// Import and inject analytics (works when served through a bundler or module system)
// For static hosting without a build step, Vercel will automatically inject analytics
// when Analytics is enabled in the Vercel dashboard.

// Initialize the queue for analytics events
(function() {
  // Initialize window.va if not already present
  if (window.va) return;
  
  window.va = function va() {
    (window.vaq = window.vaq || []).push(arguments);
  };
})();

// Set mode based on environment
window.vam = 'production';

// The actual analytics script will be injected by Vercel when deployed
// and Analytics is enabled in the project settings
