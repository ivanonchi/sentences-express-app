function headers() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-API-Key': apiKey()
  };
}

function apiKey() {
  return document.querySelector('meta[name="api_key"]').content;
}
