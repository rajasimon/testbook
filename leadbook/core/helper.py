import hashlib
from datetime import datetime

from django.template.loader import get_template
from django.template import Context
from django.core.mail import EmailMultiAlternatives


def generate_token():
    return hashlib.md5(datetime.now().strftime("%Y%m%d%H%M%S").encode()).hexdigest()


def send_activation_email(profile):
    DOMAIN_NAME = 'http://localhost:8000'
    activation_link = DOMAIN_NAME + '/activate/' + profile.activation_key

    context = {'activation_link': activation_link, 'username': profile.user.username}

    email_text = get_template('email.txt')
    email_html = get_template('email.html')

    text_content = email_text.render(context)
    email_content = email_html.render(context)

    #print unicode(message).encode('utf8')
    subject = 'Email Confirmation Link'
    from_email = 'rajasimon@icloud.com'
    to = profile.user.email

    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(email_content, "text/html")
    msg.send()