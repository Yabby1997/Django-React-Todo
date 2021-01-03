FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /home/django/todo
COPY requirements.txt /home/django/todo
RUN pip install -r requirements.txt
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]