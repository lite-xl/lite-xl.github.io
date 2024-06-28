#!/usr/bin/bash
tmux new -s poetry -d
tmux send-keys -t poetry 'poetry run mkdocs serve' C-m
tmux attach -t poetry

