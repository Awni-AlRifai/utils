def extractSlug(url):
    urlParts = url.split("/")
    slug = urlParts[-1] or urlParts[-2]

    if (slug.find(' ') != -1):
        slug = slug.strip().replace(" ", "-")
    return slug


print(extractSlug("https://www.cosmopolitan.com/style-beauty/a39213528/thairapy-diaries-how-i-learned-to-love-wash day"))
