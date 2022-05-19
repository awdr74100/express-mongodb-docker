# Docker Cheat Sheet

> MONGODB_URL = mongodb://localhost:27017/shop

## Docker CLI

- [docker run](#docker-run)
- [docker ps](#docker-ps)

Read more [here](https://docs.docker.com/engine/reference/run/)

### docker run

```sh
docker run node:lts           # 前景執行容器

docker run -d node:lts        # 背景執行容器

docker run --name node:lts    # 命名容器

docker run --rm node:lts      # 退出時移除容器

docker run -it node:lts sh    # 交互式進程
```

### docker ps

```sh
docker ps # c
```

## Docker Compose CLI

Read more [here](https://docs.docker.com/compose/reference/)
