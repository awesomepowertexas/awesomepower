import os

from django.core.management.commands.shell import Command

try:
    from ptpython.repl import embed

    def ptpython(self, options):
        os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
        history_filename = os.path.expanduser("~/.ptpython_history")
        embed(globals(), locals(), vi_mode=False, history_filename=history_filename)

    Command.ptpython = ptpython
    Command.shells.insert(0, "ptpython")
except ImportError:
    pass
