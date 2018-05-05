import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

broker_url = 'redis://localhost:6379'
result_backend = 'redis://localhost:6379'
accept_content = ['application/json']
task_serializer = 'json'
result_serializer = 'json'
timezone = 'Europe/Berlin'
beat_schedule_filename = os.path.join(BASE_DIR, 'celerybeat-schedule')
