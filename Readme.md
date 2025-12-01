
# Rezeptsammlung von Richard Eigenmann

Schauen Sie das Resultat hier an:

https://richardeigenmann.github.io/RezeptsammlungNg/homepage

# Developer Notes

## Publish

Push the RezeptsammlungNG as it embeds the recipes

For gh-pages:

```bash
cd /tmp/
git clone -b gh-pages git@github.com:richardeigenmann/Rezeptsammlung.git
cd /tmp/Rezeptsammlung
git checkout gh-pages
cp /richi/Src/Rezeptsammlung/*.htm .
sed -i -e "/@WAKELOCK@/ { 
    r /richi/Src/Rezeptsammlung/wakelock.js
    d
}" -e "/@LINKBACK_TAG@/ {
    r /richi/Src/Rezeptsammlung/linkback.htm
    d
}" -e "/<\/head\>/ { 
    r /richi/Src/Rezeptsammlung/google_analytics_head_tag.html
    d
}" *htm
cp /richi/Src/Rezeptsammlung/*.jpg .
php /richi/Src/Rezeptsammlung/createRecipeJsonUtf8.php
git add .
git commit -m "update"
git push
```
