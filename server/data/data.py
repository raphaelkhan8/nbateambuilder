from basketball_reference_web_scraper import client
from basketball_reference_web_scraper.data import OutputType

print("Getting advanced player season totals for 2019-2020 season")
print(client.players_advanced_season_totals(season_end_year=2020))

print("Getting advanced player season totals for 2019-2020 season in JSON format")
print(client.players_advanced_season_totals(
    season_end_year=2020, output_type=OutputType.JSON))

print("Writing advanced player season totals for 2019-2020 season to JSON file")
client.players_advanced_season_totals(season_end_year=2020, output_type=OutputType.JSON,
                                      output_file_path="./2019-2020_advanced_player_season_totals.json")
