FROM python:3.10-alpine
LABEL "com.datadoghq.ad.logs"='[{"source": "python", "service": "goaly-api"}]'
WORKDIR /goaly-api
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 8080
COPY . .
WORKDIR /goaly-api/
CMD ["gunicorn", "api.wsgi:app", "-w 2", "-b 0.0.0.0:8080", "-t 30"]
