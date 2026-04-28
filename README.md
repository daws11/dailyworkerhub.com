

test</EOF>
git add README.md && git commit -m "test: trigger deploy" && GIT_SSH_COMMAND="ssh -i /home/deploy/.openclaw/workspace/dailyworkerhub_deploy -o StrictHostKeyChecking=no" git push origin main
