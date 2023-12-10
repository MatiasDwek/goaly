FROM python:3.10-alpine

LABEL "com.datadoghq.ad.logs"='[{"source": "python", "service": "goaly-api"}]'
ENV DD_SERVICE=goaly-api
ENV DD_LOGS_INJECTION=true
ENV DD_AGENT_HOST=172.17.0.1

WORKDIR /goaly-api
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 8080
COPY . .

# Add volume mount for the root.crt file
VOLUME ["/root/.postgresql/"]

WORKDIR /goaly-api/
# TODO Change workers to > 1 when we have the database
CMD ["ddtrace-run", "gunicorn", "api.wsgi:app", "-w 1", "-b 0.0.0.0:8080", "-t 30"]
