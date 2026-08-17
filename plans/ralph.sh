set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

PROMPT='@plans/prd.json @progress.txt
1. Find the highest-priority feature to work on and work only on that feature. This should be the one YOU decide has the highest priority — not necessarily the first in the list.
2. Before committing, run ALL feedback loops:
   a. Gates: yarn lint && yarn typecheck && yarn test (all three must pass)
   b. If the PRD item has "browserTest": true, use Playwright browser tools to verify on http://localhost:3000 before marking passes:true. Navigate to the page, take snapshots, interact (hover, click, resize), and confirm the PRD steps actually pass. Do NOT mark passes:true without browser verification. If "browserTest": false, code inspection is sufficient.
   Do NOT commit if any feedback loop fails. Fix issues first.
3. Update the PRD with the work that was done.
4. Append your progress to the progress.txt file. Use this to leave a note for the next person working in the codebase.
5. Make a git commit of that feature.
ONLY WORK ON A SINGLE FEATURE.
If, while implementing the feature, you notice the PRD is complete, output <promise>COMPLETE</promise>.'

for ((i=1; i<=$1; i++)); do
  result=$(docker sandbox run claude . -- \
    --permission-mode acceptEdits \
    -p "$PROMPT")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "PRD complete, exiting."
    exit 0
  fi
done
