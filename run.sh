#!/bin/zsh

echo "[] Searching for simulator..."

if ! xcrun simctl list devices | grep -q "(Booted)"; then
  echo "[] No iOS simulator running, starting one..."
  sleep 10
fi

if ! pgrep -f "yarn ios" > /dev/null; then
  echo "[] Starting metro bundler..."
  yarn ios &
  sleep 10
fi

while ! curl -s -o /dev/null http://localhost:8081; do
  echo "[] Waiting for Metro Bundler to start"
  sleep 10
done

echo "✅ Found iOS simulator"

echo "[] Running login test for new user"
maestro test tests/login.yaml
echo "✅ Finished"

echo "[] Running delete user test"
bun run tests/scripts/delete-user.ts
echo "✅ Finished"

echo "[] Running login test for existing user"
maestro test tests/login1.yaml
echo "✅ Finished"

echo "[] Running login test for existing user"
maestro test tests/login2.yaml
echo "✅ Finished"