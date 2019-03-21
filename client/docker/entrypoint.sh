#!/bin/bash
if [ -d "./node_modules" ]; then
  # Control will enter here if $DIRECTORY exists.
  echo "Skipping 'npm install' if 'node_modules dir exists'. Delete 'node_modules' and restart the container if you want to reinstall binaries."

  else
    echo "Installing dependencies once"
    npm install
fi

exec "$@";
