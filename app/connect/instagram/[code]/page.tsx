export default async function({params}: {params: { slug: string }}) {

  // Get the authorization code from the query string
  const code = params.slug;

  // Make a request to exchange the authorization code for an access token
  const response = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: 'https://socialcomprehend.appliedhealthinformatics.com/connect/instagram',
      code,
    }),
  });

  // Parse the response JSON and store the access token in the user's session or database
  const data = await response.json();
  const accessToken = data.access_token;

  // Return a response to the client
  return (
    <div>
      <h1>Success!</h1>
      <p>Access token: {accessToken}</p>
    </div>
  )
  
}
