# Screen Size

💻 Source JSON for list of all screen size (Desktop, Phone & Tablet)

Scrapped from http://screensiz.es, latest 2 October 2018

## Usage

You can access the **device.json** file directly to this url :

```
https://raw.githubusercontent.com/muhibbudins/screen-size/master/device.json
```

Or, if you want to get it from AJAX you can follow example below :

```js
const source = 'https://raw.githubusercontent.com/muhibbudins/screen-size/master/device.json'

// Axios
axios.get(source).then({ data } => {
  console.log(data)
})

// Fetch
fetch(source)
  .then(stream => stream.json())
  .then(result => {
    console.log(result)
  })
```

## Credits

Any data on json file, scrapped from http://screensiz.es

## License

This project under MIT License
