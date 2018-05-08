#!/bin/bash

CURRENT_DIR="$(dirname "$0")"
EXPORT_NUTSHELL_KEY="$CURRENT_DIR/ssh-nutshell-key.sh"

# EXport Nutshell private SSH key
source $EXPORT_NUTSHELL_KEY

if [ "$NUTSHELL_KEY" != "" ]; then
  echo "[Nutshell] - detected SSH key for git. Adding SSH config" >&1
  echo "" >&1

  # Ensure we have the ssh folder
  if [ ! -d ~/.ssh ]; then
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
  fi

  # Load the private key into a file.
  echo $NUTSHELL_KEY | base64 --decode > ~/.ssh/deploy_key

  # Change the permissions on the file to
  # be read-write for this user.
  chmod 600 ~/.ssh/deploy_key

  # Setup the ssh config file.
  # Switch out the hostname for different hosts.
  echo -e "Host github.com\n"\
          " IdentityFile ~/.ssh/deploy_key\n"\
          " IdentitiesOnly yes\n"\
          " UserKnownHostsFile=/dev/null\n"\
          " StrictHostKeyChecking no"\
          > ~/.ssh/config
else
 echo "[Nutshell] [ERROR] NUTSHELL_KEY env variable has not be found. Does $EXPORT_NUTSHELL_KEY file exist ?"
 exit 1
fi
