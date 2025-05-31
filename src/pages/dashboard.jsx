// src/pages/dashboard.jsx
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [userGuilds, setUserGuilds] = useState([]);
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return;

    // Exchange code for user & guild info from your backend
    fetch(`http://localhost:3000/api/auth/discord`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then(res => res.json())
      .then(data => {
        setUserGuilds(data.guilds);
        // optionally set user info too
      });
  }, []);

  const handleGuildSelect = (guildId) => {
    setSelectedGuild(guildId);
    fetch(`http://localhost:3000/api/discord/${guildId}/channels`)
      .then(res => res.json())
      .then(data => setChannels(data.channels));
  };

  const handleBotAdd = (channelId) => {
    fetch(`http://localhost:3000/api/discord/${selectedGuild}/add-bot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channelId }),
    })
      .then(res => res.json())
      .then(data => alert('Bot invited or configured!'));
  };

  return (
    <div>
      <h2>Select a Server</h2>
      {userGuilds.map((g) => (
        <button key={g.id} onClick={() => handleGuildSelect(g.id)}>
          {g.name}
        </button>
      ))}

      {channels.length > 0 && (
        <>
          <h3>Select a Channel</h3>
          {channels.map((c) => (
            <button key={c.id} onClick={() => handleBotAdd(c.id)}>
              {c.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
