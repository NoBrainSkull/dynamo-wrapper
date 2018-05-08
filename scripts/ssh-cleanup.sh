#!/bin/bash

CURRENT_DIR="$(dirname "$0")"
EXPORT_NUTSHELL_KEY="$CURRENT_DIR/ssh-nutshell-key.sh"

# export Nutshell private SSH key
source $EXPORT_NUTSHELL_KEY

if [ "$NUTSHELL_KEY" != "" ]; then
  echo "[Nutshell] - Cleaning up SSH config" >&1
  echo "" >&1

  # Now that npm has finished running,
  # we shouldn't need the ssh key/config anymore.
  # Remove the files that we created.
  rm -f ~/.ssh/config
  rm -f ~/.ssh/deploy_key

  # Clear that sensitive key data from the environment
  export NUTSHELL_KEY=0
fi
