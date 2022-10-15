FROM python:3.8

WORKDIR /code

COPY requirements.txt /code/
COPY main.py /code/
COPY appsettings.ini /code/
COPY app /code/app


RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

CMD ["python3", "main.py"]
