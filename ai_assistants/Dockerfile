FROM nginx

LABEL maintainer="kevincuray41@gmail.com"

COPY --chown=nginx:root ./dist/ai_assistants/browser /opt/ai_assistants/nginx/ai_assistants

COPY ./config/nginx.conf /etc/nginx/nginx.conf

#docker build -t lambo10/ai_assistants:prototipo-dev-0.0.0 .
#docker push lambo10/ai_assistants:prototipo-dev-0.0.0
#docker run -p 4320:4320 lambo10/ai_assistants:prototipo-dev-0.0.0