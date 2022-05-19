# FROM alpine

# LABEL maintainer="a78945612385238@gmail.com"

# RUN apk --no-cache upgrade

# RUN apk add --no-cache apache2

# EXPOSE 80

# CMD [ "-D", "FOREGROUND" ]

# ENTRYPOINT [ "/usr/sbin/httpd" ]


FROM alpine
ARG NODE_ARG
ENV NODE_ENV="${NODE_ARG:-development}"
RUN echo "ARG=${NODE_ARG}, ENV=${NODE_ENV}"
# CMD echo "ARG=${NODE_ARG}, ENV=${NODE_ENV}"
