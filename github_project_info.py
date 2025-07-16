import json
import os
import requests

def get_all_github_repos_with_requests(access_token):
    all_repos_data = []

    url = "https://api.github.com/user/repos"
    
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {access_token}"
    }
    
    params = {
        "per_page": 100
    }

    print("Fetching repositories via GitHub REST API...")

    while url:
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            
            repos_page = response.json()
            
            for idx, repo in enumerate(repos_page):
                repo_data = {
                    "id": idx,
                    "name": repo['name'],
                    "desc": repo['description'] if repo['description'] else "",
                    "link": repo['html_url'],
                    "tags": repo['topics']
                }
                all_repos_data.append(repo_data)
            
            if 'link' in response.headers:
                links = requests.utils.parse_header_links(response.headers['link'])
                next_url_info = next((link for link in links if link.get("rel") == "next"), None)
                
                if next_url_info:
                    url = next_url_info['url']
                else:
                    url = None
            else:
                url = None

            params = None

        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 401:
                raise Exception("Authentication error (401). Check if your access token is valid and has the 'repo' permission.")
            else:
                raise e

    print(f"Total of {len(all_repos_data)} repositories found.")
    return all_repos_data


if __name__ == "__main__":
    try:
        my_repositories = get_all_github_repos_with_requests(os.environ['GITHUB_TOKEN'])
        
        with open('src/data/projects.js', 'w+') as f:
            f.writelines('export const allProjects = ')
            f.write(json.dumps(my_repositories, indent=4))

    except (ValueError, Exception) as e:
        print(f"Error: {e}")