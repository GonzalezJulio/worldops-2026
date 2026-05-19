from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text, func
from pydantic import BaseModel
from prometheus_fastapi_instrumentator import Instrumentator
from prometheus_client import Counter


from app.database import engine, SessionLocal
from app.models import Vote
from app.redis_client import redis_client

app = FastAPI()

Instrumentator().instrument(app).expose(app)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEAMS = [
    "Argentina",
    "Brasil",
    "Francia",
    "España",
    "Alemania"
]

votes_counter = Counter(
    "worldops_votes_total",
    "Total votes by team",
    ["team"]
)

class VoteRequest(BaseModel):
    team: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db-check")
def db_check():

    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {"database": "connected"}


@app.get("/redis-check")
def redis_check():

    redis_client.set("test", "worldops")

    value = redis_client.get("test")

    return {
        "redis": "connected",
        "value": value
    }


@app.get("/teams")
def get_teams():

    return {
        "teams": TEAMS
    }

@app.get("/stats")
def stats():

    db = SessionLocal()

    total_votes = db.query(Vote).count()

    top_team = (
        db.query(
            Vote.team,
            func.count(Vote.team).label("votes")
        )
        .group_by(Vote.team)
        .order_by(func.count(Vote.team).desc())
        .first()
    )

    ranking = (
        db.query(
            Vote.team,
            func.count(Vote.team).label("votes")
        )
        .group_by(Vote.team)
        .all()
    )

    db.close()

    return {
        "total_votes": total_votes,
        "top_team": top_team.team if top_team else None,
        "ranking": {
            team: votes
            for team, votes in ranking
        }
    }

@app.post("/vote")
def vote(vote: VoteRequest):

    team = vote.team

    # Redis realtime
    redis_client.incr(f"votes:{team}")
    
    votes_counter.labels(team=team).inc()
    # PostgreSQL persistence
    db = SessionLocal()

    new_vote = Vote(team=team)

    db.add(new_vote)
    db.commit()

    db.close()

    return {
        "message": f"Vote registered for {team}"
    }
    
@app.get("/ranking")
def ranking():

    results = {}

    for team in TEAMS:

        votes = redis_client.get(f"votes:{team}")

        results[team] = int(votes) if votes else 0

    return results