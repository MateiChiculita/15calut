#!/usr/bin/env bash
set -euo pipefail

OUTDIR="$(pwd)/videos"
mkdir -p "$OUTDIR"

FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
WIDTH=640
HEIGHT=360
DURATION=6

declare -a TITLES=(
  "Big Buck Bunny"
  "Elephants Dream"
  "For Bigger Blazes"
  "Sintel Trailer"
  "Tears of Steel"
  "For Bigger Escape"
  "Subaru Outback"
  "Volkswagen GTI Review"
)

declare -a COLORS=(
  "0xFF6A00"
  "0xFF4D25"
  "0xFF8A00"
  "0xFF5722"
  "0xFF7043"
  "0xFF8F00"
  "0xFF3B30"
  "0xFF6D47"
)

for i in "${!TITLES[@]}"; do
  idx=$((i+1))
  title=${TITLES[i]}
  color=${COLORS[i]}
  out="$OUTDIR/video${idx}.mp4"

  echo "Generating $out: $title"

  ffmpeg -y -f lavfi -i color=c=${color}:s=${WIDTH}x${HEIGHT}:d=${DURATION} \
    -vf "drawtext=fontfile=${FONT}:text='${title}':fontcolor=white:fontsize=28:x=(w-text_w)/2:y=(h-text_h)/2,format=yuv420p" \
    -movflags +faststart -c:v libx264 -preset veryfast -crf 23 -pix_fmt yuv420p "$out" >/dev/null 2>&1

done

echo "All videos generated in $OUTDIR"
