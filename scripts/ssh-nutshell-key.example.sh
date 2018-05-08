NUTSHELL_HOME=/var/lib/nutshell

if test $NUTSHELL_HOME = ""; then
  echo "[Nutshell] [ERROR] NUTSHELL_HOME is undefined. Please export it as a global variable."
  exit 1
fi

if [ ! -f "$NUTSHELL_HOME/github_private_repo_rsa" ]; then
  echo "[Nutshell] [ERROR] $NUTSHELL_HOME/github_private_repo_rsa cannot be found. Please add this file"
  exit 1
fi

export NUTSHELL_KEY=$(base64 -w 0 < "$NUTSHELL_HOME/github_private_repo_rsa")