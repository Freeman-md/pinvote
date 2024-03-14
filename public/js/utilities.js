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

document.getElementById('notification-dropdown-button').addEventListener('click', () => {
    const notificationDropdown = document.getElementById('notification-dropdown')

    if (notificationDropdown.classList.contains('scale-100')) {
        notificationDropdown.classList.remove('scale-100')
        notificationDropdown.classList.add('scale-0')
    } else {
        notificationDropdown.classList.remove('scale-0')
        notificationDropdown.classList.add('scale-100')
    }
})

const markNotificationAsReadButtons = document.querySelectorAll('.mark-notification-as-read')

markNotificationAsReadButtons.forEach(button => {
    const notificationId = button.getAttribute('data-id')
    button.addEventListener('click', () => {
        markNotificationAsRead(notificationId)
    })
})