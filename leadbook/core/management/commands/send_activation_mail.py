"""
Leadbook custom management commands.
"""
# Third-party packages ( Django )
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User

# Project level helper function imports
from leadbook.core.helper import send_activation_email


# Single class based function for management commands
class Command(BaseCommand):
    """
    By extending BaseCommand to create custom management commands like runserver.

    When user forgot to activate the mail he received or in some cases user wants
    to activate the account in this case admin can able to trigger the send mail
    function using this custom management command.

    python manage.py send_activation_mail <username>
    """
    help = 'Send activation mail to user'

    def add_arguments(self, parser):
        # Expect single string argument
        parser.add_argument('username', type=str)

    def handle(self, *args, **options):
        # This handle function exectues evertime user enter the command
        username =  options['username']

        # Handling edge case. what if user enters the username not present in the system.
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise CommandError('No user found for this username {}'.format(username))

        # Finally send activation mail to user by calling the helper function. 
        send_activation_email(user.profile)
        self.stdout.write(self.style.SUCCESS('Main Sent successfully to "%s"' % username))
