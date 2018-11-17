# Space Dogs!

Pulls from three APIs to show a random APOD and the people currently in space represented by pictures of dogs.

## Getting Started

1. Open index.html in your web browser.
2. Look at dogs.

### Prerequisites

-Computer

-Web browser

```
Example: Chrome
```

## Built With

* [APOD API](https://api.nasa.gov/api.html#apod) - API generates an astronomy picture of the day based on the date given
* [Humans in Space API](http://open-notify.org/Open-Notify-API/People-In-Space/) - Returns number of humans currently in space, their names, and the craft they are on
* [Random Dog API](https://dog.ceo/dog-api/) - Returns random dog picture 


## API Explanation 
1. APOD - returns Astronomy Picture of the Day for date given in url as well as image credit, title and description. 
I needed to generate a random date in between the first APOD (June 16, 1996) and the current date.  I grab date of first APOD and the current date in Unix Time and set them to min and max. Then subtract min time from max time and multiply by a random number between 0 and 1 to get a random time between min and max. Convert it back to regular format then pull the year in YYYY format, then pull the month but it returns only one digit if less than 10 and is 0 indexed, so I add 1, convert it to a string so I can add a 0 to the front, and pull the last two digits so it comes out in in MM format.  Same with the date but its not zero indexed

2. Humans in Space - returns the number of humans in space, their names, and space craft.  I append each to a card.

3. Random Dog API - return the url of a picture of a dog. Grab the url and append it to the astronaut card. 


## Authors

* **Langdon Froker** - *Initial work* - 


## License

Free to use

## Acknowledgments

* [Helped me figure out generating random date in the right format](https://apod.nasa.gov/apod/random_apod.html)

