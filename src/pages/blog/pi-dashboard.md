---
layout: ../../BlogLayout.astro
title: "My custom home server dashboard"
date: "2026-09-04"
---
You can check out the source code for this project on [GitHub](https://github.com/kostaskoukos/pi-dashboard).

I own a Raspberry Pi 4 Model B with 2GB RAM but I haven't got around to using it, until now.
I have some ideas (that you may see in the future 👀) for self hosted services, but I first wanted to build a dashboard to monitor these services.
Of course, a ready-made solution like [Homepage](https://gethomepage.dev/) would have been easier, but I wanted to learn by doing.

## The tech stack

This is a simple HTTP server made with the [uv](https://github.com/astral-sh/uv) package manager, [FastAPI](https://fastapi.tiangolo.com/) web server and [Jinja2](https://jinja.palletsprojects.com/en/stable/templates/) templates, and it is served with Uvicorn from a Docker container.

## The Docker integration

I am planning to run all my services in Docker containers, so I wanted to be able to monitor them from the dashboard.
However, the point of containers is isolation, so I needed to get information from the containers to the host machine.
The `docker stats` command does what I want, but I need to run it on the host, not inside the container.
This command communicates with the [Docker API](https://docs.docker.com/reference/api/engine/version/v1.55/) through a Unix socket on the path `/var/run/docker.sock`.

So, all I needed to do was to mount this socket into the container running the dashboard, and I would be able to communicate with the Docker API from inside the container.
Luckily, [this Python library](https://docker-py.readthedocs.io/en/stable/) enables you to communicate with the Docker API from Python like this:

```python
import docker

client = docker.from_env()
client.containers.run("ubuntu", "echo hello world")
```

## The main logic

I needed to get the list of all containers, and fetch each container's stats. The Docker API provides a streaming endpoint, but I wanted to keep it non interactive, so I used the function `container.stats(stream=False)` to get the stats in a dictionary.
[This page](https://docs.docker.com/reference/api/engine/version/v1.55/#tag/Container/operation/ContainerStats) on the API docs describes how to calculate the CPU% and memory% usage, which is what I wanted to display.

### The problem

However, each request takes ~1.4 seconds! This is because two fetches are needed to get the CPU%. But for 4 containers, this means 5.6 seconds to load the page!

### The solution

To solve this, I used Python's `asyncio` library with a `ThreadPoolExecutor` to fetch the stats concurrently in the background every 3 seconds and store them in a global variable, a bit like this:

```python
containers = []

def get_all_container_stats():
    all_containers = docker_client.containers.list(all=True)

    with ThreadPoolExecutor(max_workers=10) as executor:
        results = executor.map(get_container_stats, all_containers)
        return [res for res in results if res is not None]

async def update_stats_bg():
    global containers
    while True:
        containers = await asyncio.to_thread(get_all_container_stats)
        print("Updated container stats.")
        await asyncio.sleep(3)
```

This way, when the user requests the page, the stats are already available and the page loads instantly.

## The frontend

The frontend is a static HTML page with Jinja templates, that Copilot helped me style. For each container, a card is displayed with the status (red for stopped, green for running), name and its stats. Clicking on a card opens the container's service on a new tab.

## The deployment

I dockerized the app with a simple `Dockerfile` and deployed it on my Raspberry Pi with Docker Compose. It mounted the socket file and exposed the port 8000 to the reverse proxy. The card links are customizable through Docker labels for each service defined in the `docker-compose.yml` file.

## The future

In the future I may add more features to this dashboard like
- Streaming real-time stats (which would require frontend setup)
- Controlling the containers (start/stop/restart)
- Live logs for each container

Until then, I am happy with the result and I learned a lot about Docker, FastAPI and async programming in Python!
