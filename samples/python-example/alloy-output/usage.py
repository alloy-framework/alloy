from client import PetstoreClient

body = {"name": "Bidu"}
client: PetstoreClient = PetstoreClient()
client.create_pet(body)