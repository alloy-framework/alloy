package main.java.me.example.code;

import main.java.me.example.code.models.Person;

public class Main {
  public static void main(String[] args) {
    Person person = new Person("Tom", 27);
    person.displayInfo();
  }
}