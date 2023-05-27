# joifaker

joifaker generates fake data using [`faker`](https://www.npmjs.com/package/@faker-js/faker) and [`joi`](https://joi.dev/).

## installing

to install run `npm i joifaker` in terminal

## using

**1- create a joi schema**

```
const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    age: Joi.number().min(13)
});
```

**2- pass it to joifaker.generate()**

`const list = joifaker.generate(schema);`

## return value

It returns an array of generated fake objects (10 by default) corresponding to the schema passed to it.

```
[
    {name: "John Smith", email: "john@yahoo.com", age: 30},
    {name: "Steve Rogers", email: "steve@gmail.com", age: 24}
]

```

You can pass the number of records you want as the second parameter to the function.

`const list = joifaker.generate(schema, 20);`

## How data are generated?

As I found `faker` to be a little slow, in order to build the output faster, the module by default uses a set of local data to generate the output. The result is however created based on a limited set of data.

To use `faker` as the generator, pass `true` as the third parameter to the function:

`const generatedByFaker = joifaker.generate(schema, 10, true)`

Result will be more diverse and probably more accurate but the trade-off is that getting the data takes more time.

## supported formats

Currently these formats are supported by the module:

```
string:
    - base64
    - creditCard
    - domain
    - email
    - guid
    - ip
    - isoDate
    - firstName
    - lastName
    - name
    - userName
    - url
    - slug
    - content

number:
    - port
    - year
    - age
    - price
```

It checks schema keys and types to find a match

```
email: Joi.string() -> returns an email
contact: Joi.string().email() -> again returns an email

```

If a matching format is not found, it returns a default value based on the type (string, date, number, boolean)

## Rules

The module also applies rules defined by schema such as `max` or `uppercase`:

```
    string:
        - max
        - min
        - case
        - length
    number:
        - greater
        - max
        - less
        - min
        - multiple
        - sign
        - precision
    date:
        - greater
        - min
        - less
        - max
```

For example:

`age: Joi.number().min(13)`

will return numbers greater than 13
