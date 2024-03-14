// Assume you have a function to get the CSRF token from the server
async function getCsrfToken() {
  const response = await fetch('/csrf-token');
  const data = await response.json();
  return data.csrfToken;
}

// Example of making a POST request with fetch including CSRF token
async function postData(url = '', data = {}) {
  const csrfToken = await getCsrfToken();

  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': csrfToken,
    },
    body: JSON.stringify(data),
  });
}

const markNotificationAsRead = async (notificationId) => {
  try {

    console.log('marking notification as read')

    const response = await postData(`/notifications/${notificationId}/mark-as-read`)

    if (response.ok) {
      console.log('notification marked as read')
    } else {
      const error = await response.json()

      console.log('Response is ok but there is an error: ', error.message)
    }
  } catch (error) {
    console.log(error.message)
  } finally {
    
  }
}