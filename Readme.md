https://richardeigenmann.github.io/Rezeptsammlung/Recipes.htm

# Publish

```bash
sudo ant pushSourceforge
```

Push the RezeptsammlungNG as it embeds the recipes

For gh-pages
sed -i.bak -e "s/@GOOGLE_ANALYTICS@/<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','\/\/www.google-analytics.com\/analytics.js','ga');ga('create','UA-47341387-3', 'auto');ga('send', 'pageview');<\/script>/" -e "s/@LINKBACK_TAG@/<p CLASS='linkback'><a href='https:\/\/richardeigenmann.github.io\/RezeptsammlungNg' target='_parent'>Richi's Rezeptsammlung<\/a><\/p>/" *htm
