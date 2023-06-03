from bs4 import BeautifulSoup
from csv_processor import process_csv_file, write_csv_file
import re

# row handler


def handle_keywords_row(row, storage):
    storage.append([row[0],row[1]])


def check_match(keyword, link_text):
    # Convert both the keyword and link_text to lowercase for case-insensitive comparison
    # keyword = keyword.lower()
    # link_text = link_text.lower()

    # # Use regular expression to find the keyword as a separate word
    # pattern = r'\b{}\b'.format(re.escape(keyword))

    # # Check if the keyword exists in the link_text as a separate word
    # if re.search(pattern, link_text):
    #     return True
    # else:
    #     return False
    return keyword.lower() == link_text.lower()


def handle_match(keyword, link, content_link):
    return [content_link, keyword[0], link.get_text(), link.get('href'),keyword[1]]


def body_handler(row, storage, keywords):
    body = parse_html(row[0])
    content_link = row[1]
    links = body.find_all('a')
    for link in links:
        for keyword in keywords:
            if (check_match(keyword[0], link.get_text())):
                result = handle_match(keyword, link, content_link)
                storage.append(result)


# parse the body


def parse_html(htm_content):
    soup = BeautifulSoup(htm_content, 'html.parser')
    return soup


def main():
    keywords = process_csv_file(
        'LinkRec2/seo_keywords.csv', handle_keywords_row)
    matches = [["content keyword found in it",
                "keyword", "match", "url goes to",'keyword url']]
    process_csv_file('LinkRec2/testData.csv', body_handler, matches, keywords)

    write_csv_file('LinkRec2/result.csv', matches)


main()
