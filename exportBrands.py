import gspread


from google.oauth2.service_account import Credentials


# The set of data that you want to export to the Google Sheet
data = {'koat', 'wtae', 'bountiful-gardens', 'hearst-autos-shopping-logic', 'wgal', 'countryliving', 'womenshealthmag', 'digitalspy', 'redbookmag', 'fotogramas', 'harpersbazaar', 'altaonline', 'testing-world', 'holiday-wonders', 'fujingaho', 'wapt', 'quemedices', 'bug-tracking', 'roadandtrack', 'shondaland', 'cosmopolitan', 'spring-summer', 'popularmechanics', 'historychannel', 'citv', 'quality-times', 'wmtw', 'wbaltv', 'odessa-observer', 'wesh', 'townandcountrymag', 'bringatrailer', 'wcvb', 'oprahdaily', 'netdoctor', 'san-antonio-sounder', 'nature-trail', 'thepioneerwoman', 'bicycling', 'khtvnews', 'redonline', 'gioia', 'elle', 'wjcl', 'wdsu', 'esquire', 'victoria-view', 'jan', 'elledecor', 'runnersworld', 'kcra', 'bestproducts', 'delish', 'nuevo-estilo',
        'kmbc', 'seventeen', '25ans', 'wyff4', 'autoweek', 'ellemen', 'nationaldesk', 'ego', 'prevention', 'demo', 'blazetv', 'diezminutos', 'wvtm13', 'micasarevista', 'wisn', 'quotenet', 'crecerfeliz', 'womansday', 'prima', 'koco', 'veranda', 'crfashionbook', 'wlky', 'wxii12', 'elledecoration', 'glamour', 'vogue', 'mynbc5', 'marieclaire', 'biography', 'canadianblackbook', 'salon', 'wmur', 'wpbf', 'gearpatrol', 'resin', 'ketv', 'wlwt', 'caranddriver', 'fre', 'houston-post', 'fort-worth-bugle', 'emprendedores', 'ksbw', 'elleeten', 'goodhousekeeping', 'nationalgeographic', 'quo', 'modernliving', 'welcome-fall', 'mor-tv', '4029tv', 'ellegirl', 'wearesweet', 'arrevista', 'qpmagazine', 'menshealth', 'quest', 'ellechina', 'kcci', 'housebeautiful', 'wheelhouse'}

# Build the credentials object
creds = Credentials.from_service_account_file("credentials.json")
client = gspread.authorize(creds)
sheet = client.open("SEOGRA-267").sheet1


# Build the Google Sheets API client
