# [data.js](data.js)

## Adding environments

To add a new environment, just add a new property to the `const urls` with the name of the new environment.
It should follow this pattern:

```
env: {
    citi: 'https://env.citihabitats.com/',
    newTaxi: 'https://env-newtaxi.corcoran.com/'
}
```

Where `env` is the name of the environment. A URL for each application should be provided.