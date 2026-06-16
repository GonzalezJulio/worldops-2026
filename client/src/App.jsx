import { useEffect, useState } from "react";

const API_URL = "/api";

function App() {
const [teams, setTeams] = useState([]);
const [ranking, setRanking] = useState([]);

useEffect(() => {
fetchTeams();
fetchRanking();
}, []);

const fetchTeams = async () => {
try {
const response = await fetch(`${API_URL}/teams`);
const data = await response.json();


  setTeams(Array.isArray(data) ? data : data.teams || []);
} catch (error) {
  console.error("Error fetching teams:", error);
}


};

const fetchRanking = async () => {
try {
const response = await fetch(`${API_URL}/ranking`);
const data = await response.json();


  const rankingArray = Object.entries(data).map(([team, votes]) => ({
    team,
    votes,
  }));

  rankingArray.sort((a, b) => b.votes - a.votes);

  setRanking(rankingArray);
} catch (error) {
  console.error("Error fetching ranking:", error);
}


};

const vote = async (team) => {
try {
await fetch(`${API_URL}/vote`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ team }),
});


  fetchRanking();
} catch (error) {
  console.error("Error voting:", error);
}


};

const totalVotes = ranking.reduce(
(acc, item) => acc + item.votes,
0
);

const leader =
ranking.length > 0
? ranking[0].team
: "Sin votos";

return (
<div
className="min-h-screen text-white p-10 bg-cover bg-center bg-fixed relative"
style={{
backgroundImage: "url('/fondo_pantalla.png')",
}}
>
{/* Overlay */} <div className="absolute inset-0 bg-black/75"></div>

```
  <div className="relative z-10">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-2xl">
          🏆 WorldOps 2026
        </h1>

        <p className="text-gray-300 text-lg">
          Plataforma cloud-native de votación y observabilidad del Mundial 2026
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

          <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-5 shadow-xl">
            <h3 className="text-sm text-gray-400 mb-2">
              🏆 Líder actual
            </h3>

            <p className="text-2xl font-bold text-cyan-400">
              {leader}
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-lg border border-green-500/20 rounded-xl p-5 shadow-xl">
            <h3 className="text-sm text-gray-400 mb-2">
              🗳️ Total votos
            </h3>

            <p className="text-2xl font-bold text-green-400">
              {totalVotes}
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-lg border border-emerald-500/20 rounded-xl p-5 shadow-xl">
            <h3 className="text-sm text-gray-400 mb-2">
              ⚡ Estado Plataforma
            </h3>

            <p className="text-2xl font-bold text-emerald-400">
              Online
            </p>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Teams */}
        <div className="lg:col-span-2">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {teams.map((team) => (
              <div
                key={team}
                className="
                  bg-black/40
                  backdrop-blur-lg
                  border border-cyan-500/20
                  rounded-2xl
                  p-6
                  shadow-2xl
                  hover:scale-105
                  hover:border-cyan-400
                  transition
                "
              >
                <h2 className="text-2xl font-semibold mb-4">
                  {team}
                </h2>

                <button
                  onClick={() => vote(team)}
                  className="
                    w-full
                    bg-cyan-500
                    hover:bg-cyan-400
                    text-black
                    font-bold
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  Votar
                </button>
              </div>
            ))}

          </div>
        </div>

        {/* Ranking */}
        <div>

          <div
            className="
              bg-black/40
              backdrop-blur-lg
              border border-cyan-500/20
              rounded-2xl
              p-6
              shadow-2xl
            "
          >

            <h2 className="text-3xl font-bold mb-6">
              🌎 Ranking Mundial
            </h2>

            <div className="space-y-4">

              {ranking.map((item, index) => (
                <div
                  key={item.team}
                  className="
                    bg-black/50
                    backdrop-blur-md
                    rounded-xl
                    p-4
                    border
                    border-white/10
                    hover:border-cyan-400/50
                    transition
                  "
                >
                  <div className="flex justify-between mb-2">

                    <span className="font-semibold">
                      #{index + 1} {item.team}
                    </span>

                    <span className="text-cyan-400 font-bold">
                      {item.votes} votos
                    </span>

                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-cyan-400 h-3 rounded-full transition-all"
                      style={{
                        width: `${Math.min(item.votes * 10, 100)}%`,
                      }}
                    />
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</div>


);
}

export default App;