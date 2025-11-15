import json
import os

import requests


def get_all_github_repos_with_requests(access_token):
    all_repos_data = []
    repo_id_counter = 0

    url = "https://api.github.com/user/repos"

    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {access_token}",
    }

    params = {"per_page": 100, "affiliation": "owner", "visibility": "public"}

    print("Fetching repositories via GitHub REST API...")

    while url:
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()

            repos_page = response.json()

            for repo in repos_page:
                if repo["archived"]:
                    continue

                repo_data = {
                    "id": repo_id_counter,
                    "name": repo["name"],
                    "desc": repo["description"] if repo["description"] else "",
                    "link": repo["html_url"],
                    "tags": repo["topics"],
                }
                all_repos_data.append(repo_data)
                repo_id_counter += 1

            if "link" in response.headers:
                links = requests.utils.parse_header_links(response.headers["link"])
                next_url_info = next(
                    (link for link in links if link.get("rel") == "next"), None
                )

                if next_url_info:
                    url = next_url_info["url"]
                else:
                    url = None
            else:
                url = None

            params = None

        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 401:
                raise Exception(
                    "Authentication error (401). Check if your access token is valid and has the 'repo' permission."
                )
            else:
                raise e

    print(f"Total of {len(all_repos_data)} repositories found.")
    return all_repos_data


def get_pinned_repos_with_graphql(access_token):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    query = """
    query {
      viewer {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    """

    print("Fetching pinned repositories via GitHub GraphQL API...")

    graphql_url = "https://api.github.com/graphql"
    response = requests.post(graphql_url, headers=headers, json={"query": query})
    response.raise_for_status()

    data = response.json()

    if "errors" in data:
        raise Exception(f"GraphQL query failed: {data['errors']}")

    pinned_repos = data["data"]["viewer"]["pinnedItems"]["nodes"]

    formatted_pinned_repos = []
    for idx, repo in enumerate(pinned_repos):
        repo_data = {
            "id": idx,
            "name": repo["name"],
            "desc": repo["description"] if repo["description"] else "",
            "link": repo["url"],
            "tags": [
                node["topic"]["name"] for node in repo["repositoryTopics"]["nodes"]
            ],
        }
        formatted_pinned_repos.append(repo_data)

    print(f"Found {len(formatted_pinned_repos)} pinned repositories.")
    return formatted_pinned_repos


if __name__ == "__main__":
    try:
        token = os.environ["GITHUB_TOKEN"]

        all_projects = get_all_github_repos_with_requests(token)
        featured_projects = get_pinned_repos_with_graphql(token)

        with open("src/data/projects.js", "w+") as f:
            f.write("export const allProjects = ")
            f.write(json.dumps(all_projects, indent=4))
            f.write(";\n\n")
            f.write("export const featuredProjects = ")
            f.write(json.dumps(featured_projects, indent=4))
            f.write(";\n")

    except (ValueError, Exception) as e:
        print(f"Error: {e}")
