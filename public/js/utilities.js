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

const addNotification = (data) => {
    const container = document.getElementById('notification-container');
    const notificationDiv = document.createElement('div');
    notificationDiv.classList.add('p-2', 'mt-4', 'bg-primary/20', 'rounded', 'shadow', 'fade-in');
    notificationDiv.innerHTML = `
      <strong class="text-lg">${data.title}</strong>
      <p class="text-sm">${data.message}</p>
      <button onclick="window.location.href='${data.action.link}'" class="mt-2 text-primary">${data.action.text}</button>
    `;
    
    container.appendChild(notificationDiv);

    // Remove the notification after 5 seconds
    setTimeout(() => {
      notificationDiv.classList.replace('fade-in', 'fade-out');
      // Wait for animation to complete before removal
      setTimeout(() => notificationDiv.remove(), 500);
    }, 5000);
  }

document.getElementById('notification-dropdown-button')?.addEventListener('click', () => {
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
    
    const handleClick = () => {
        const notificationMarkedAsRead = markNotificationAsRead(notificationId);

        if (notificationMarkedAsRead) {
            button.removeEventListener('click', handleClick);

            button.parentElement.removeChild(button);
        }
    };

    button.addEventListener('click', handleClick);
})