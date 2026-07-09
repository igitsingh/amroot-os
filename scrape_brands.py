import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import re
import json

queries = [
    "buy lakadong turmeric online india",
    "premium lakadong turmeric brands",
    "best lakadong turmeric powder",
    "organic lakadong turmeric 9% curcumin",
    "meghalaya lakadong turmeric buy"
]

brands = set()

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for query in queries:
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read()
        soup = BeautifulSoup(html, 'html.parser')
        for a in soup.find_all('a', class_='result__url'):
            link = a.get('href')
            text = a.text.strip().lower()
            if text and 'amazon' not in text and 'flipkart' not in text and 'indiamart' not in text:
                # Try to extract brand from domain name
                domain = re.sub(r'^www\.', '', text)
                domain = domain.split('.')[0]
                if len(domain) > 3:
                    brands.add(domain)
    except Exception as e:
        print("Error:", e)

print(json.dumps(list(brands)))
