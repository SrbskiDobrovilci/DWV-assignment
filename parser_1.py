from bs4 import BeautifulSoup
import requests

HEADERS = {'User-Agent': 'Mozilla/5.0'}

response = requests.get('https://en.wikipedia.org/wiki/List_of_highest-grossing_films', headers= HEADERS)

soup = BeautifulSoup(response.content, "lxml")


table = soup.find('table', { 'class' : 'wikitable plainrowheaders sticky-header col4right col5center col6center'})


films = []


for row in table.select('tr')[1:]:
    film = {}
    film['name']  = row.find('a').text
    film['href'] = row.find('a')['href'] 
    film['Box Office Revenue']  = row.find_all('td')[2].text
    film['year']  = row.find_all('td')[3].text
    films.append(film)
print(films)
