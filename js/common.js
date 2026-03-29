/**
 * Common utilities for WAYMAKERS
 */

// Utility: Get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (let [key, value] of params) {
        obj[key] = value;
    }
    return obj;
}

// Utility: Format timestamp
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Utility: Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
