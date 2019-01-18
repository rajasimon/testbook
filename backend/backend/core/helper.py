import hashlib
from datetime import datetime


def generate_token():
    return hashlib.md5(datetime.now().strftime("%Y%m%d%H%M%S").encode()).hexdigest()