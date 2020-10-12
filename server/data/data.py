# season_end_year can only be 2000 - 2020
# Visit https://github.com/jaebradley/basketball_reference_web_scraper for more info

import json

from basketball_reference_web_scraper import client
from basketball_reference_web_scraper.data import OutputType

season_end_year = 2020

total_season_stats = client.players_season_totals(
    season_end_year)
advanced_stats = client.players_advanced_season_totals(
    season_end_year)

for a, b in zip(total_season_stats, advanced_stats):
    a["advanced_stats"] = b
    a["positions"] = a["positions"][0].value
    a["team"] = a["team"].value
    del a["advanced_stats"]['positions']
    del a["advanced_stats"]['team']

season_stats = json.dumps(total_season_stats)

with open('./{year}_season_totals.json'.format(year=season_end_year), 'w') as outfile:
    json.dump(total_season_stats, outfile)
