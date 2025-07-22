from models import Pet
from requests import get
from requests import post
from requests.models import Response

class PetstoreClient:
    def create_pet(self, body: Pet) -> Response:
        response = post("/pets", json="body")return response.json()


    def list_pets(self) -> Response:
        response_2 = get(_2"/pets")return [Pet(**data) for data in response.json()]


    def get_amt_pets(self) -> Response:
        response_3 = get(_3"/pets_amt")return response.json()


    def get_pet(self, id: str) -> Response:
        response_4 = get(_4"/pets/" + id)return response.json()

