# Original Layout Backup

This directory contains a complete backup of the original website layout before migrating to the Obsidian-style design.

## Files Backed Up
- `index.html` - Original homepage
- `links.html` - Original links page  
- `security.html` - Original security resources page
- `strava-page.html` - Original Strava stats page
- All CSS files from the original design
- All JavaScript files from the original design
- All assets and other resources

## Restore Instructions
To restore the original layout:
1. Copy files from this backup directory back to `/public/`
2. Remove the Obsidian-style files:
   - `css/obsidian-layout.css`
   - `js/obsidian-nav.js`
3. Update index.html to use the original structure

## Migration Date
Migrated to Obsidian-style layout on: 2025-01-21

## Original Structure
The original site used a traditional multi-page structure with:
- Bootstrap 5 for styling
- Individual HTML pages for each section
- Simple dark mode toggle
- Static navigation between pages