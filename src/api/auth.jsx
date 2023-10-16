import React from "react";

export default function SpotifyLogin() {
  const clientId = ""; // Typing Your client_id there
  const redirectUri = "http://localhost:3000"; // Adjust the redirect URI
  const scope = "user-read-private user-read-email"; // Adjust scope based on your needs
  const state = "some-random-state"; // Generate a random state for security

  const handleLoginClick = () => {
    const spotifyLoginUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
    window.location = spotifyLoginUrl;
  };

  return (
    <>
      <button onClick={handleLoginClick}>Login with Spotify</button>
    </>
  );
}
