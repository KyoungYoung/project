import requests

def SearchMovies(query, year):
    
    params = {"api_key": "d516745898f6293a295ed20361b456e5",
              "language" : "ko",
              "page" : "1",
              "query" : query,
              "include_adult" : "true",
              "year" : year}
    
    url = "https://api.themoviedb.org/3/search/movie"
    resp = requests.get(url, params=params)
    data = resp.json()['results']
    
    print(data)
    if(len(data) > 0):
        
        for item in data :
            print(item['original_title'], item['release_date'])
            
if __name__ == '__main__':
    SearchMovies('럭키', "2011")