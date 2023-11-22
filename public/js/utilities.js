const shareLink = async (url) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Share Poll',
                text: 'Check out this poll:',
                url: url,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        // Fallback for browsers that do not support the Web Share API
        alert('Your browser does not support the native share dialog. You can manually copy the link.');
    }
}