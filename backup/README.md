# Docker Command

跑一個 apache 容器:

```powershell
docker run httpd:alpine
```

跑一個背景執行 apache 容器，並命名為 apache

```powershell
docker run -d --name apache httpd:alpine
```

跑一個 redis 容器，啟動互動模式及虛擬終端機，結束後自動從系統移除容器:

```powershell
docker run -it --rm redis:alpine sh
```

列出所有執行中容器:

```powershell
docker ps
```

列出所有容器:

```powershell
docker ps -a
```

列出所有容器的 ID:

```powershell
docker ps -a -q
```

停止容器:

```powershell
docker stop apache
```

重新啟動容器 (stop => start / start => stop => start):

```powershell
docker restart apache
```

強制停止容器:

```powershell
docker kill apache
```

移除容器:

```powershell
docker rm apache
```

移除所有容器:

```powershell
docker rm -f $(docker ps -a -q)
```

本機複製檔案至容器:

```powershell
docker cp hello.html apache:/usr/local/apache2/htdocs
```

容器複製檔案至本機:

```powershell
docker cp apache:/usr/local/apache2/htdocs/index.html ./index.html
```

在容器內執行程式:

```powershell
docker exec -it apache sh
```

掛載目錄 (存在即覆蓋):

```powershell
docker run -d --name apache2 -v $PWD/hello.html:/usr/local/apache2/htdocs/index.html httpd:alpine
```

建立本機到容器連線:

```powershell
docker run -d -v $PWD/hello.html:/usr/local/apache2/htdocs/index.html -p 80:80 httpd:alpine
```

建立容器到本機連線:

```txt
hostname 改成 host.docker.internal:80
```

查看容器狀態:

```powershell
docker stats
```

查看容器內的行程:

```powershell
docker top apache
```

查看容器日誌:

```powershell
docker logs apache # 一次查看

docker logs -f apache # 持續查看 (f 表示 follow 意思，即時輸出到 console)
```

拉取與推送映像檔:

```powershell
docker pull node:alpine # run 本地不存在的 image 時，本就會自行拉取，即自動完成這個動作

docker tag node:alpine ian/node:alpine # 添加新的標籤 (不同名子的映像檔)

docker push ian/node:alpine # 推送到私人倉庫
```

登入 docker hub:

```powershell
docker login
```

清除映像檔與容器:

```powershell
docker stop $(docker ps -a -q) # 暫停全部 container

docker system prune # 刪除所有未使用的 container 與 image (僅包含懸掛 image)

docker rmi $(docker image -a -q) # 刪除所有 image

docker volume rm $(docker volume ls) # 刪除所有 volume

docker system prune -a -f --volumes # 刪除所有未使用的 container 與 image 與 volume (包含懸掛及未使用 image)(不提示確認，表示強制)
```

查看所有映像檔:

```powershell
docker images
```

建立映像檔 (指定 PATH 是當前目錄, 可透過 -f 更改 Dockerfile 預設名稱):

```powershell
docker build . -t apache:v1
```

複寫 CMD (-v 將會複寫 CMD 參數)

```powershell
docker run --rm apache:v1 -v
```

ENV 環境變數:

```powershell
FROM alpine
ENV NODE_ENV="development"
```

ARG 傳入參數:

```powershell
FROM alpine
ARG NODE_ARG
ENV NODE_ENV="${NODE_ARG:-development}"
RUN echo "ARG=${NODE_ARG}, ENV=${NODE_ENV}"
CMD echo "ARG=${NODE_ARG}, ENV=${NODE_ENV}"
```

關掉 `DOCKER_BUILDKIT` 以查看過程:

```powershell
DOCKER_BUILDKIT=0
```

傳入 NODE_ARG 參數:

```powershell
DOCKER_BUILDKIT=0 docker build --build-arg NODE_ARG=staging .
```

不傳入 NODE_ARG 參數 (NODE_ENV 將設為預設值):

```powershell
DOCKER_BUILDKIT=0 docker build .
```

COPY 與 ADD 複製文件 (盡量使用 COPY 而不是 ADD):

```powershell
COPY package.json /app/ # 複製package.json到/app下

COPY --chown=user:group file* /app/ # 複製所有file開頭的檔案到/app下，並改變檔案所屬用戶與群組
```

建立 `.dockerignore` 使指定檔案被忽略加入:

```powershell
ni .dockerignore
```

使用 WORKDIR 切換目錄:

```powershell
RUN echo "say hi" > hi.txt # hi.txt 會在 / 目錄下

WORKDIR /app

RUN echo "hello" > world.txt # world.txt 會在 /app 的目錄下
```

指定當前用戶 (未指定即設為 Root):

```powershell
RUN groupadd -r redis && useradd -r -g redis redis # 新增 group 與 user

USER redis # 指定當前的用戶為 redis

RUN [ "redis-server" ] # 以 redis 的身份執行 redis-server
```

HEALTHCHECK 健康檢查 (不健康將重啟):

```powershell
FROM nginx

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

HEALTHCHECK --interval=5s --timeout=3s \ CMD curl -fs http://localhost/ || exit 1
```

打造最小 Docker 映像檔 (Multi-stage Build):

- [distroless](https://github.com/GoogleContainerTools/distroless)

```powershell
# Stage 1 建置環境
FROM node:16 AS build-env
COPY . /app

# Stage 2 執行環境
FROM gcr.io/distroless/nodejs:16
COPY --from=build-env /app /app
WORKDIR /app
CMD ["hello.js"]
```

確認目前 builder 為何:

```powershell
docker buildx ls
```

建立新的 builder 並切換過去:

```powershell
docker buildx create --name multiarch --use
```

在 Linux 建立 builder 需額外跑 qemu-user-static 容器及將 driver 設為 docker-container:

```powershell
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

docker buildx create --name multiarch --driver docker-container --use
```

檢查目前的 builder:

```powershell
docker buildx inspect --bootstrap
```

建構多系統架構映像檔，同時推送至 Registry:

```powershell
docker buildx build . --platform linux/amd64,linux/arm64 --push -t hello:v1
```
