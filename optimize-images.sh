#!/bin/bash

SRC="/Users/vixtorp/Sites/passlaqua-paisajismo/public/proyectos/00 NEW"
DST="/Users/vixtorp/Sites/passlaqua-paisajismo/public/proyectos/00 NEW optimized"

total=$(find "$SRC" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.heic" -o -iname "*.webp" \) | wc -l | tr -d ' ')
count=0
errors=0

echo "🌿 Optimizando $total imágenes..."
echo ""

find "$SRC" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.heic" -o -iname "*.webp" \) | while read -r img; do
  # Ruta relativa desde SRC
  rel="${img#$SRC/}"
  # Carpeta destino
  dir=$(dirname "$rel")
  # Nombre sin extensión
  base=$(basename "$rel" | sed 's/\.[^.]*$//')

  out_dir="$DST/$dir"
  out_file="$out_dir/${base}.jpg"

  mkdir -p "$out_dir"

  # Convertir y optimizar con sips
  sips -s format jpeg -s formatOptions 85 \
       --resampleHeightWidthMax 2000 \
       "$img" --out "$out_file" > /dev/null 2>&1

  if [ $? -eq 0 ]; then
    count=$((count + 1))
    echo "[$count/$total] $rel"
  else
    errors=$((errors + 1))
    echo "  ⚠️  ERROR: $rel"
  fi
done

echo ""
echo "✅ Listo. Optimizadas en: $DST"
echo "   Errores: $errors"

# Tamaño original vs optimizado
orig_size=$(du -sh "$SRC" 2>/dev/null | cut -f1)
new_size=$(du -sh "$DST" 2>/dev/null | cut -f1)
echo "   Tamaño original:   $orig_size"
echo "   Tamaño optimizado: $new_size"
