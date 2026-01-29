import sys
from pathlib import Path
path = Path(sys.argv[1])
max_lines = int(sys.argv[2])
for i, line in enumerate(path.read_text().splitlines(), 1):
    if i > max_lines:
        break
    print(f"{i}: {line}")
