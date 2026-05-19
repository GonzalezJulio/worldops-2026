import { useEffect, useState } from "react";

function App() {
  const [teams, setTeams] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetchTeams();
    fetchRanking();
  }, []);

  const fetchTeams = async () => {
    const response = await fetch("http://localhost:8000/teams");
    const data = await response.json();
   setTeams(Array.isArray(data) ? data : data.teams || []);
  };

  const fetchRanking = async () => {
  const response = await fetch("http://localhost:8000/ranking");
  const data = await response.json();

  const rankingArray = Object.entries(data).map(([team, votes]) => ({
    team,
    votes,
  }));

  setRanking(rankingArray);
};

  const vote = async (team) => {
    await fetch("http://localhost:8000/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team }),
    });

    fetchRanking();
  };

  return (
    <div className="min-h-screen p-10">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">
            ⚽ WorldOps 2026
          </h1>

          <p className="text-gray-400 text-lg">
            Plataforma cloud-native de votación y observabilidad del Mundial 2026
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Teams */}
          <div className="lg:col-span-2">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {teams.map((team) => (
                <div
                  key={team}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl hover:scale-105 transition"
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    {team}
                  </h2>

                  <button
                    onClick={() => vote(team)}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition"
                  >
                    Votar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking */}
          <div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">

              <h2 className="text-3xl font-bold mb-6">
                🏆 Ranking
              </h2>

              <div className="space-y-4">

                {ranking.map((item, index) => (
                  <div
                    key={item.team}
                    className="bg-black/30 rounded-xl p-4"
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
                        className="bg-cyan-400 h-3 rounded-full"
                        style={{
                          width: `${item.votes * 10}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;