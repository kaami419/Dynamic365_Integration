export async function storeUserDetails(userEmail, accessToken, dynamicsUrl) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userEmail,
      accessToken,
      dynamicsUrl,
    }),
  });

  const data = await response.json();
  return data;
}

