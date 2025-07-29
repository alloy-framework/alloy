from models import Pet
from requests import delete
from requests import get
from requests import post
from requests import put

class PetstoreClient:
    """
    A simple API for managing a pet store.
    """
    def create_pet(self, body: dict) -> Pet:
        """
        Create a new pet in the store.

        Args:
            body (dict)

        Returns:
            Pet: The created pet.
        """
        response = post("/pets", json=body)
        return response.json()

    def list_pets(self) -> list[Pet]:
        """
        List all pets in the store.

        Returns:
            list[Pet]: A list of pets.
        """
        response = get("/pets")
        return [Pet(**data) for data in response.json()]

    def get_pet(self, id: str) -> Pet:
        """
        Get a pet by its ID.

        Args:
            id (str)

        Returns:
            Pet: The pet with the specified ID.
        """
        response = get("/pets/" + id)
        return response.json()

    def update_pet(self, id: str, body: dict) -> Pet:
        """
        Update an existing pet.

        Args:
            id (str)

            body (dict)

        Returns:
            Pet: The updated pet.
        """
        response = put("/pets/" + id, json=body)
        return response.json()

    def delete_pet(self) -> bool:
        """
        Delete a pet by its ID.

        Returns:
            bool: True if the pet was deleted, False otherwise.
        """
        response = delete("/pets/:id/delete")
        return response.json()

    def add_toy_to_pet(self, body: dict) -> Pet:
        """
        Add a toy to a pet.

        Args:
            body (dict)

        Returns:
            Pet: The pet with the added toy.
        """
        response = post("/pets/:id/toys", json=body)
        return response.json()

    def get_amt_pets(self) -> int:
        """
        Get the total number of pets in the store.

        Returns:
            int: The total number of pets.
        """
        response = get("/pets_amt")
        return response.json()

