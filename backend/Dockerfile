FROM python:3.8-alpine

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_APP api.py

ENTRYPOINT [ "flask" ]
EXPOSE 5000:5000
CMD ["run", "--host", "0.0.0.0"]