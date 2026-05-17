from fastapi import FastAPI
from app.redis_client import redis_client



app = FastAPI()

@app.get("/redis-check")
def redis_check():

    redis_client.set("test", "worldops")

    value = redis_client.get("test")

    return {
        "redis": "connected",
        "value": value
    }
    

@app.get("/health")
def health():
    return {"status": "ok"}