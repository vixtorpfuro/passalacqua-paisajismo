#!/bin/bash
# Optimiza imágenes en public/ — convierte a JPG, max 1920px, calidad 82
# Excluye: proyectos/, wellbeing/, nosotras/, blog/ (van a Sanity)
# Excluye: logos (PNG con transparencia)

TARGET="/Users/vixtorp/Sites/passlaqua-paisajismo/public"
MAX_W=1920
QUALITY=82
SKIP_DIRS="proyectos|wellbeing|nosotras|blog"
SKIP_FILES="logo|Logo"

echo "🌿 Optimizando imágenes en $TARGET"
echo "   Max: ${MAX_W}px · Calidad: ${QUALITY} · Formato: JPG"
echo ""

converted=0
skipped=0

while IFS= read -r -d '' file; do
  # Saltar carpetas excluidas
  if echo "$file" | grep -qE "$SKIP_DIRS"; then continue; fi
  # Saltar logos
  if echo "$file" | grep -qE "$SKIP_FILES"; then continue; fi

  ext="${file##*.}"
  extl=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
  dir=$(dirname "$file")
  base=$(basename "$file" ".$ext")
  out="$dir/$base.jpg"

  original_size=$(du -k "$file" | cut -f1)

  if [ "$extl" = "jpg" ] || [ "$extl" = "jpeg" ]; then
    # Ya es JPG — solo redimensionar y comprimir in-place
    sips -s format jpeg -s formatOptions $QUALITY -Z $MAX_W "$file" --out "$out" &>/dev/null
  elif [ "$extl" = "png" ] || [ "$extl" = "webp" ]; then
    # Convertir a JPG
    sips -s format jpeg -s formatOptions $QUALITY -Z $MAX_W "$file" --out "$out" &>/dev/null
    if [ "$out" != "$file" ]; then
      rm "$file"
    fi
  else
    continue
  fi

  new_size=$(du -k "$out" | cut -f1)
  saved=$(( original_size - new_size ))
  echo "  ✓ $(basename "$out")  ${original_size}KB → ${new_size}KB  (-${saved}KB)"
  ((converted++))

done < <(find "$TARGET" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -print0)

echo ""
echo "✅ $converted imágenes optimizadas"
