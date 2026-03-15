#!/bin/bash
# Lighthouse audit для всех страниц на разных разрешениях.
# Каждый запуск — один viewport, без смешивания разрешений.
#
# Использование: ./scripts/lighthouse-audit.sh [BASE_URL]
# По умолчанию: http://localhost:3000 (запустите npm run start перед этим)

BASE_URL="${1:-http://localhost:3000}"
OUTPUT_DIR="./lighthouse-reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_DIR="${OUTPUT_DIR}/${TIMESTAMP}"
PAGES=("/" "/about" "/sessions" "/contact")
WIDTHS=(360 720 1024 1440 1920)
HEIGHTS=(640 1280 768 900 1080)

echo "=== Lighthouse Audit ==="
echo "URL: $BASE_URL"
echo "Отчёты: $REPORT_DIR"
echo "Задержка между запусками: 15 сек"
echo ""

for i in "${!WIDTHS[@]}"; do
  WIDTH="${WIDTHS[$i]}"
  HEIGHT="${HEIGHTS[$i]}"
  RESOLUTION_DIR="${REPORT_DIR}/${WIDTH}x${HEIGHT}"
  mkdir -p "$RESOLUTION_DIR"

  for PAGE in "${PAGES[@]}"; do
    if [ "$PAGE" = "/" ]; then
      SLUG="home"
    else
      SLUG="${PAGE:1}"
    fi
    URL="${BASE_URL}${PAGE}"
    OUTPUT="${RESOLUTION_DIR}/${SLUG}.report.html"

    if [ "$WIDTH" -lt 1024 ]; then
      FORM_FACTOR="mobile"
      MOBILE="true"
    else
      FORM_FACTOR="desktop"
      MOBILE="false"
    fi

    echo "→ $URL @ ${WIDTH}x${HEIGHT} → $OUTPUT"
    lighthouse "$URL" \
      --form-factor="$FORM_FACTOR" \
      --screenEmulation.width="$WIDTH" \
      --screenEmulation.height="$HEIGHT" \
      --screenEmulation.mobile="$MOBILE" \
      --screenEmulation.deviceScaleFactor=1 \
      --output=html \
      --output-path="$OUTPUT"

   
  done
done

echo ""
echo "Готово! Отчёты в папке: $REPORT_DIR"
echo ""
echo "Структура:"
echo "  $REPORT_DIR/"
for i in "${!WIDTHS[@]}"; do
  echo "     ${WIDTHS[$i]}x${HEIGHTS[$i]}/"
  for PAGE in "${PAGES[@]}"; do
    [ "$PAGE" = "/" ] && SLUG="home" || SLUG="${PAGE:1}"
    echo "        ${SLUG}.report.html"
  done
done
