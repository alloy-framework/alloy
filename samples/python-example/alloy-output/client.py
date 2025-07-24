from models import Pet
from models import Toy
from requests import delete
from requests import get
from requests import post
from requests import put

class PetstoreClient:
    def create_pet(self, body: Pet) -> Pet:
        response = post("/pets", json=body)
        return response.json()


    def list_pets(self) -> list[Pet]:
        response = get("/pets")
        return [Pet(**data) for data in response.json()]


    def get_pet(self, id: str) -> Pet:
        response = get("/pets/" + id)
        return response.json()


    def update_pet(self, id: str, body: Pet) -> Pet:
        response = put("/pets/" + id, json=body)
        return response.json()


    def delete_pet(self) -> bool:
        response = delete("/pets/:id/delete")
        return response.json()


    def add_toy_to_pet(self, body: Toy) -> Pet:
        response = post("/pets/:id/toys", json=body)
        return response.json()


    def get_amt_pets(self) -> int:
        response = get("/pets_amt")
        return response.json()

