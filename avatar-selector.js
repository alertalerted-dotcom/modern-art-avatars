// avatar-selector.js

const AvatarSelector = {
    /**
     * Initializes the avatar selector and renders it into a specified element.
     * @param {object} config - The configuration object.
     * @param {string} config.elementId - The ID of the HTML element to render the grid in.
     * @param {string} config.githubUser - The GitHub username or organization.
     * @param {string} config.githubRepo - The GitHub repository name.
     * @param {string} config.branch - The branch name (e.g., 'main').
     * @param {string} config.postUrl - The URL of your backend endpoint to receive the selection.
     */
    create: async function(config) {
        // --- 1. Validate configuration and get the container element ---
        const requiredKeys = ['elementId', 'githubUser', 'githubRepo', 'branch', 'postUrl'];
        for (const key of requiredKeys) {
            if (!config[key]) {
                console.error(`AvatarSelector config missing required key: ${key}`);
                return;
            }
        }
        const container = document.getElementById(config.elementId);
        if (!container) {
            console.error(`AvatarSelector could not find element with ID: ${config.elementId}`);
            return;
        }
        container.innerHTML = '<p>Loading Avatars...</p>'; // Loading state

        // --- 2. Fetch all file paths from the GitHub repository ---
        const apiUrl = `https://api.github.com/repos/${config.githubUser}/${config.githubRepo}/git/trees/${config.branch}?recursive=1`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`GitHub API Error: ${response.statusText}`);
            const data = await response.json();
            
            container.innerHTML = ''; // Clear loading state
            const files = data.tree;

            // --- 3. Render each avatar image ---
            files.forEach(file => {
                if (file.type === 'blob' && file.path.startsWith('avatars/') && (file.path.endsWith('.png') || file.path.endsWith('.jpg'))) {
                    const imageUrl = `https://cdn.jsdelivr.net/gh/${config.githubUser}/${config.githubRepo}@${config.branch}/${file.path}`;
                    
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.style.width = '120px'; // Example styling
                    img.style.cursor = 'pointer';
                    img.style.margin = '10px';
                    img.style.borderRadius = '50%';
                    img.dataset.filePath = file.path;

                    // --- 4. Handle the click event ---
                    img.onclick = () => this.postSelection(file.path, config.postUrl, container);

                    container.appendChild(img);
                }
            });
        } catch (error) {
            console.error('Failed to load avatars:', error);
            container.innerHTML = '<p>Error loading avatars.</p>';
        }
    },

    /**
     * Sends the selected avatar path to the specified backend URL.
     * @param {string} filePath - The full path of the selected avatar.
     * @param {string} postUrl - The backend endpoint URL.
     * @param {HTMLElement} container - The container element for UI feedback.
     */
    postSelection: async function(filePath, postUrl, container) {
        console.log(`Sending ${filePath} to ${postUrl}`);
        container.innerHTML = `<p>Saving selection: ${filePath.split('/').pop()}</p>`; // UI feedback

        try {
            const response = await fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    avatar_path: filePath // Sending data in a JSON object
                })
            });

            if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
            
            const result = await response.json();
            console.log('Server response:', result);
            container.innerHTML = `<p>Success! Your avatar has been saved.</p>`; // Final success message
        
        } catch (error) {
            console.error('Failed to post selection:', error);
            container.innerHTML = `<p>Could not save selection. Please try again.</p>`;
        }
    }
};

