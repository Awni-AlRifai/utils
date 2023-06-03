from urllib.parse import urlparse

brands = {'testing-world', 'emprendedores', 'fotogramas', 'ketv', '25ans', 'bestproducts', 'quo', 'vogue', 'digitalspy', 'wearesweet', 'kcci', 'crecerfeliz', 'canadianblackbook', 'caranddriver', 'modernliving', 'wtae', 'shondaland', 'wpbf', 'quemedices', 'kcra', 'wyff4', 'gioia', 'diezminutos', 'jan', 'wlwt', 'prima', 'netdoctor', 'bountiful-gardens', 'wxii12', 'harpersbazaar', 'holiday-wonders', 'delish', 'oprahdaily', 'hearst-autos-shopping-logic', 'nationaldesk', 'prevention', 'quotenet', 'wlky', 'housebeautiful', 'wdsu', 'biography', 'bicycling', 'wcvb', 'san-antonio-sounder', 'bringatrailer', 'townandcountrymag', 'blazetv', 'womenshealthmag', 'cosmopolitan', '4029tv', 'fort-worth-bugle', 'micasarevista', 'redonline', 'fujingaho', 'autoweek', 'elledecor',
          'runnersworld', 'koco', 'salon', 'ellemen', 'wmur', 'spring-summer', 'koat', 'ksbw', 'arrevista', 'wapt', 'wbaltv', 'elleeten', 'elle', 'citv', 'fre', 'thepioneerwoman', 'marieclaire', 'houston-post', 'wesh', 'esquire', 'demo', 'khtvnews', 'kmbc', 'ego', 'elledecoration', 'womansday', 'nuevo-estilo', 'mynbc5', 'wmtw', 'resin', 'bug-tracking', 'ellegirl', 'wgal', 'wheelhouse', 'glamour', 'ellechina', 'historychannel', 'redbookmag', 'altaonline', 'nature-trail', 'qpmagazine', 'crfashionbook', 'wjcl', 'wisn', 'welcome-fall', 'veranda', 'quality-times', 'quest', 'odessa-observer', 'goodhousekeeping', 'gearpatrol', 'menshealth', 'popularmechanics', 'countryliving', 'victoria-view', 'mor-tv', 'wvtm13', 'roadandtrack', 'seventeen', 'nationalgeographic'}


def isInternalLink(url):
    parsed_url = urlparse(url)
    hostname_parts = parsed_url.hostname.split('.')
    # check for the domain name which will be the second element
    # ex: shop.goodhousekeepng.com || www.goodhousekeeping.com
    if hostname_parts[1] in brands:
        return True

    return False


url1 = "https://shop.goodhousekeeping.com/uk/consumer-advice/money/a32050166/coronavirus-money-bills-debt/"
url2 = "http://testcom"

print(isInternalLink(url1))  # http://shop.com

