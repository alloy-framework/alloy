from models import Pet

import requests

class PetstoreClient:
    def create_pet(self, body: Pet) -> Pet:
        response = requests.post("/pets", json=body)
        return response.json()


    def list_pets(self) -> list[Pet]:
        response = requests.get("/pets")
        return [Pet(**data) for data in response.json()]


    def get_amt_pets(self) -> int:
        response = requests.get("/pets_amt")
        return response.json()


    def get_pet(self, id: str) -> Pet:
        response = requests.get("/pets/" + id)
        return response.json()

