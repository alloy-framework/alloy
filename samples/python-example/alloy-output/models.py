class Toy:
    id: str
    name: str


class Pet:
    id: str
    name: str
    age: int
    favoriteToys: list[Toy]
    breed: str | None
