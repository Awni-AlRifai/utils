import difflib

text1 = "If the URL of the page != {{custom_canonical}} AND (the domain of the page != domain of the {{custom_canonical}} OR the locale of the page != locale of the {{custom_canonical}}) THEN the content is syndicated the value of the dimension should the the canonical URL (not custom_canonical) The new dimension number is {{105}} NOTE: Im pretty sure about this but please verify by looking at the code. # By default, a page’s canonical URL is itself. 2. That is overridden is a custom_canonical exists 3. That is overridden in some cases where the content is syndicated from US to UK (eg DEL US → DEL UK). In that case, content may be syndicated by its also self-canonicaled. eg [https://www-stage.delish.com/uk/cooking/recipes/a30514210/pot-o-gold-cups-recipe/|https://www-stage.delish.com/uk/cooking/recipes/a30514210/pot-o-gold-cups-recipe/|smart-link] ||*Page*||*custom_canonical*||*Dimension value*|| || |www.foo.com/page|www.foo.com/old/page|null|same domain, same locale| |www.foo.com/page|www.foo.com/page|null|URLs are not different| |www.foo.com/page|www.bar.com/page|www.bar.com/page|different domain| |www.foo.com/page|www.foo.com/uk/page|www.foo.com/uk/page|different locale| |www.foo.com/page|www.bar.com/uk/page|www.bar.com/uk/page|different domain, different locale| *Considerations:* * Ads and analytics repo needs an update to include the new dimension"
text2 = "If the URL of the page != {{custom_canonical}} AND (the domain of the page != domain of the {{custom_canonical}} OR the locale of the page != locale of the {{custom_canonical}}) THEN the content is syndicated the value of the dimension should then be the canonical URL (not custom_canonical) The new dimension number is {{105}} NOTE: Im pretty sure about this but please verify by looking at the code. # By default, a page’s canonical URL is itself. 2. That is overridden if a custom_canonical exists 3. That is overridden in some cases where the content is syndicated from US to UK (eg DEL US → DEL UK). In that case, content may be syndicated by its also self-canonicaled. eg [https://www-stage.delish.com/uk/cooking/recipes/a30514210/pot-o-gold-cups-recipe/|https://www-stage.delish.com/uk/cooking/recipes/a30514210/pot-o-gold-cups-recipe/|smart-link] ||*Page*||*custom_canonical*||*Dimension value*|| || |www.foo.com/page|www.foo.com/old/page|null|same domain, same locale| |www.foo.com/page|www.foo.com/page|null|URLs are not different| |www.foo.com/page|www.bar.com/page|www.bar.com/page|different domain| |www.foo.com/page|www.foo.com/uk/page|www.foo.com/uk/page|different locale| |www.foo.com/page|www.bar.com/uk/page|www.bar.com/uk/page|different domain, different locale| *Considerations:* * Ads and analytics repo needs an update to include the new dimension"

# Create a Differ object
differ = difflib.Differ()

# Compare the texts
diff = differ.compare(text1.splitlines(), text2.splitlines())

# Print the differences
print('\n'.join(diff))