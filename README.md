modern-art-avatars
A collection of modern, flat-style avatars and a simple JavaScript library to let users select one from your website. The images are served from a CDN (jsDelivr) for fast performance.
🚀 How to Use
You can integrate the avatar selector into your website with three simple steps.
1. Add a Container Element
Place a div in your HTML file where you want the avatar selector to appear.
<div id="avatar-selector-container"></div>

2. Include the Script
Add this script tag to your HTML file. It loads the library directly from the jsDelivr CDN.
<script src="https://cdn.jsdelivr.net/gh/alertalerted-dotcom/modern-art-avatars@main/avatar-selector.js"></script>

3. Initialize the Library
Add a second script tag to configure and create the selector.
<script>
    document.addEventListener('DOMContentLoaded', () => {
        AvatarSelector.create({
            // The ID of the container element from Step 1
            elementId: 'avatar-selector-container',

            // Your GitHub repository details
            githubUser: 'alertalerted-dotcom',
            githubRepo: 'modern-art-avatars',
            branch: 'main',

            // The backend URL that will receive the user's selection
            postUrl: 'https://your-backend.com/api/save-avatar'
        });
    });
</script>

🎨 How to Create More Avatars
To create new avatars that match the existing style, follow this technical breakdown and prompt structure.
1. Style
 * Modern flat/cartoon avatar style
 * Clean line art with bold outlines
 * Minimal shading (soft gradient shadows)
 * Stylized but proportionally accurate anatomy
 * Slight gloss and shadow around clothing folds
2. Color Palette
 * Soft but saturated colors
 * Slight gradient for clothing
 * Skin tones: balanced and not over-saturated
 * Hair and accessories: flat with subtle highlights
3. Angle & Pose
 * Full body, ¾ standing view
 * Head slightly tilted for personality
 * Neutral to confident pose (weight on one leg)
 * Ground shadow oval to anchor the subject
4. Lighting & Shadows
 * Light from top front
 * Soft shadow below feet (elliptical)
 * Gentle inner shadow on hoodie folds / sleeves
5. Background
 * Transparent background for export
 * Shadow preserved as a soft opacity object
📁 File Structure
To add new avatars, place them in the appropriate sub-folder within the avatars/ directory. The library will find them automatically.
avatars/
├── female/
│   ├── asian/
│   ├── black/
│   ├── brown/
│   └── white/
└── male/
    ├── asian/
    ├── black/
    ├── brown/
    └── white/

