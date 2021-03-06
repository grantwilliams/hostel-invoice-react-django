from __future__ import absolute_import
import os
from hostel_invoice import celeryconfig
from celery import Celery
from celery.task.schedules import crontab
from django.conf import settings

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hostel_invoice.settings')
app = Celery('hostel_invoice')


# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object(celeryconfig)
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
  'dl-bookings': {
    'task': 'task_download_bookings',
    'schedule': crontab(minute='*/1')
  }
}

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
