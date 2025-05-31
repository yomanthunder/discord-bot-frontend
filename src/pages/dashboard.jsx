// src/pages/dashboard.jsx
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [userGuilds, setUserGuilds] = useState([]);
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [channels, setChannels] = useState([]);

  const handleGuildSelect = (guildId) => {
    setSelectedGuild(guildId);
    fetch(`http://localhost:3000/discord/${guildId}/channels`)
      .then(res => res.json())
      .then(data => setChannels(data.channels));
  };

  const handleBotAdd = (channelId) => {
    fetch(`http://localhost:3000/discord/${selectedGuild}/add-bot`, {
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
