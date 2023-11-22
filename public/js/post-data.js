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