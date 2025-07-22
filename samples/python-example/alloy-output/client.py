from models import Pet

class PetstoreClient:
    def create_pet(self, body: Pet) -> <Unresolved Symbol>:
        response = <Unresolved Symbol>("/pets", json="body")
        return response.json()


    def list_pets(self) -> <Unresolved Symbol>:
        response_2 = <Unresolved Symbol>(_2"/pets")
        return [Pet(**data) for data in response.json()]


    def get_amt_pets(self) -> <Unresolved Symbol>:
        response_3 = <Unresolved Symbol>(_3"/pets_amt")
        return response.json()


    def get_pet(self, id: str) -> <Unresolved Symbol>:
        response_4 = <Unresolved Symbol>(_4"/pets/" + id)
        return response.json()

