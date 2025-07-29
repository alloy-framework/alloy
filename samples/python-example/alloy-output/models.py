class Toy:
    id: str
    name: str


class Pet:
    id: str
    name: str
    age: int
    # List of favorite toys
    favoriteToys: list[Toy]
    breed: str | None
